/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Database } from '@nocobase/database';
import lodash from 'lodash';

export default {
  async ['collections:listMeta'](ctx, next) {
    const db = ctx.app.db as Database;
    const results = [];

    // In cluster mode, always reload collections from database to ensure fresh data
    const isClusterMode = process.env.CLUSTER_MODE === 'max' || process.env.CLUSTER_MODE === 'true';
    if (isClusterMode) {
      console.log('[CLUSTER] Reloading collections from database for listMeta');
      // Force reload all collections from database
      const collectionModels = await db.getRepository('collections').find();
      
      for (const model of collectionModels) {
        await model.load();
      }
    }

    db.collections.forEach((collection) => {
      if (!collection.options.loadedFromCollectionManager) {
        return;
      }

      const obj = {
        ...collection.options,
        filterTargetKey: collection.filterTargetKey,
      };

      if (collection && collection.unavailableActions) {
        obj['unavailableActions'] = collection.unavailableActions();
      }

      obj.fields = lodash.sortBy(
        [...collection.fields.values()].map((field) => {
          return {
            ...field.options,
          };
        }),
        '__sort',
      );

      results.push(obj);
    });

    ctx.body = lodash.sortBy(results, 'sort');

    await next();
  },

  async ['collections:setFields'](ctx, next) {
    const { filterByTk, values } = ctx.action.params;

    const transaction = await ctx.app.db.sequelize.transaction();

    try {
      const fields = values.fields?.map((f) => {
        delete f.key;
        return f;
      });

      const db = ctx.app.db as Database;

      const collectionModel = await db.getRepository('collections').findOne({
        filter: {
          name: filterByTk,
        },
        transaction,
      });

      const existFields = await collectionModel.getFields({
        transaction,
      });

      const needUpdateFields = fields
        .filter((f) => {
          return existFields.find((ef) => ef.name === f.name);
        })
        .map((f) => {
          return {
            ...f,
            key: existFields.find((ef) => ef.name === f.name).key,
          };
        });

      const needDestroyFields = existFields.filter((ef) => {
        return !fields.find((f) => f.name === ef.name);
      });

      const needCreatedFields = fields.filter((f) => {
        return !existFields.find((ef) => ef.name === f.name);
      });

      if (needDestroyFields.length) {
        await db.getRepository('fields').destroy({
          filterByTk: needDestroyFields.map((f) => f.key),
          transaction,
        });
      }

      if (needUpdateFields.length) {
        await db.getRepository('fields').updateMany({
          records: needUpdateFields,
          transaction,
        });
      }

      if (needCreatedFields.length) {
        await db.getRepository('collections.fields', filterByTk).create({
          values: needCreatedFields,
          transaction,
        });
      }

      await collectionModel.loadFields({
        transaction,
      });

      const collection = db.getCollection(filterByTk);

      await collection.sync({
        force: false,
        alter: {
          drop: false,
        },
        transaction,
      } as any);

      // Send sync message to other instances after field changes
      if (needCreatedFields.length > 0 || needUpdateFields.length > 0 || needDestroyFields.length > 0) {
        await ctx.app.syncMessageManager.publish('data-source-main', {
          type: 'syncCollection',
          collectionName: filterByTk,
        }, {
          transaction,
        });

        // Invalidate collection cache to force reload on other instances
        const plugin = ctx.app.getPlugin('@nocobase/plugin-data-source-main') as any;
        if (plugin && plugin.invalidateCollectionCache) {
          await plugin.invalidateCollectionCache(filterByTk);
        }

        // CRITICAL: Force reload collection on ALL instances immediately
        await ctx.app.syncMessageManager.publish('data-source-main', {
          type: 'forceReloadCollection',
          collectionName: filterByTk,
        }, {
          transaction,
        });
      }

      await transaction.commit();
    } catch (e) {
      await transaction.rollback();
      throw e;
    }

    await next();
  },
};
