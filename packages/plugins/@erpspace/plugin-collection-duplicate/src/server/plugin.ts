/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Repository } from '@nocobase/database';
import { Plugin } from '@nocobase/server';

export class PluginCollectionDuplicateServer extends Plugin {
  async afterAdd() {}

  async beforeLoad() {}

  async load() {
    this.app.actions({
      async ['collections:duplicate'](ctx, next) {
        // const postRepo = ctx.db.getRepository('posts');
        // await postRepo.create({
        //   values: {
        //     ... . ctx.action.params.values,
        //     // restrict the current user to be the creator of the post
        //     userId: ctx.state.currentUserId
        //   }
        // });
        const name = ctx.action.params.filterByTk;
        const values = ctx.action.params.values;

        // todo: duplicate collection
        const collection = await ctx.db.getRepository('collections').findOne({
          filter: {
            name,
          },
        });

        if (!collection) {
          ctx.body = {
            message: 'Not Found',
            name,
          };
          ctx.status = 404;

          await next();
          return;
        }

        const fields = await collection.getFields();

        // copy collection
        const newCollection = await ctx.db.getRepository('collections').create({
          values: {
            // title: `${collection.title} copy`,
            // name: `${collection.name}_copy`,
            ...values,
            options: collection.options,
            sort: collection.sort,
            // fields: await Promise.all(
            //   fields.map(async function (field) {
            //     let sort = field.sort;
            //     if (sort === undefined) {
            //       const originalField = await ctx.db.getRepository('fields').findOne({
            //         filter: {
            //           collectionName: collection.name,
            //           key: field.key,
            //         },
            //       });
            //       sort = originalField ? originalField.get('sort') : 0;
            //     }

            //     ctx.logger.debug('originalCollectionField.sort', { sort });

            //     return {
            //       ...field.toJSON(),
            //       id: undefined,
            //       collection_id: undefined,
            //       key: undefined,
            //       reverseKey: undefined,
            //       collectionName: undefined,
            //       collection_name: undefined,
            //       sort: sort ?? 0,
            //       // __sort: sort ?? 0,
            //     };
            //   }),
            // ),
          },
          context: ctx,
        });

        if (!newCollection) {
          ctx.throw(500);
        }

        for (const field of fields) {
          let sort = field.sort;
          if (sort === undefined) {
            const originalField = await ctx.db.getRepository('fields').findOne({
              filter: {
                collectionName: collection.name,
                key: field.key,
              },
            });
            sort = originalField ? originalField.get('sort') : 0;
          }

          await ctx.db.getRepository('fields').create({
            values: {
              ...field.toJSON(),
              id: undefined,
              collection_id: newCollection.id,
              collectionName: newCollection.name,
              collection_name: newCollection.name,
              key: undefined,
              reverseKey: undefined,
              sort: sort ?? 0,
            },
          });
        }

        ctx.body = newCollection;
        ctx.status = 201;

        await next();
      },
    });
  }

  async install() {}

  async afterEnable() {}

  async afterDisable() {}

  async remove() {}
}

export default PluginCollectionDuplicateServer;
