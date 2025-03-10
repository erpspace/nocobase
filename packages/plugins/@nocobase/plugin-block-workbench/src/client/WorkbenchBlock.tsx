/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { observer, useFieldSchema } from '@formily/react';
import {
  CollectionContext,
  createStyles,
  DataSourceContext,
  DndContext,
  Icon,
  NocoBaseRecursionField,
  useDesignable,
  useOpenModeContext,
  useSchemaInitializerRender,
  withDynamicSchemaProps,
} from '@nocobase/client';
import { Avatar, Space } from 'antd';
import { Grid, List } from 'antd-mobile';
import React, { createContext } from 'react';
import { WorkbenchLayout } from './workbenchBlockSettings';

const ConfigureActionsButton = observer(
  () => {
    const fieldSchema = useFieldSchema();
    const { render } = useSchemaInitializerRender(fieldSchema['x-initializer']);
    return render();
  },
  { displayName: 'WorkbenchConfigureActionsButton' },
);
function isMobile() {
  return window.matchMedia('(max-width: 768px)').matches;
}

const gap = 8;

const ResponsiveSpace = () => {
  const fieldSchema = useFieldSchema();
  const isMobileMedia = isMobile();
  const { isMobile: underMobileCtx } = useOpenModeContext() || {};
  const { itemsPerRow = 4 } = fieldSchema.parent['x-decorator-props'] || {};

  if (underMobileCtx || isMobileMedia) {
    return (
      <Grid columns={itemsPerRow} gap={gap}>
        {fieldSchema.mapProperties((s, key) => {
          return (
            <Grid.Item style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} key={key}>
              <NocoBaseRecursionField name={key} schema={s} />
            </Grid.Item>
          );
        })}
      </Grid>
    );
  }

  return (
    <Space wrap size={gap} align="start">
      {fieldSchema.mapProperties((s, key) => {
        return <NocoBaseRecursionField name={key} schema={s} />;
      })}
    </Space>
  );
};

const InternalIcons = () => {
  const fieldSchema = useFieldSchema();
  const { designable } = useDesignable();
  const { layout = WorkbenchLayout.Grid } = fieldSchema.parent['x-component-props'] || {};
  return (
    <div style={{ marginBottom: designable ? '1rem' : 0 }} className="nb-action-panel-warp">
      <DndContext>
        {layout === WorkbenchLayout.Grid ? (
          <ResponsiveSpace />
        ) : (
          <List>
            {fieldSchema.mapProperties((s, key) => {
              const icon = s['x-component-props']?.['icon'];
              const backgroundColor = s['x-component-props']?.['iconColor'];
              return (
                <List.Item
                  key={key}
                  prefix={<Avatar style={{ backgroundColor }} icon={<Icon type={icon} />} />}
                  onClick={() => {}}
                >
                  <NocoBaseRecursionField name={key} schema={s} />
                </List.Item>
              );
            })}
          </List>
        )}
      </DndContext>
    </div>
  );
};

export const WorkbenchBlockContext = createContext({ layout: 'grid' });

const useStyles = createStyles(({ token, css }) => ({
  containerClass: css`
    &.list {
      margin: -${token.paddingLG}px;
      border-radius: ${(token as any).borderRadiusBlock}px;
      overflow: hidden;

      .adm-list {
        --padding-left: ${token.paddingLG}px;
        --padding-right: ${token.paddingLG}px;

        .adm-list-item-content-main {
          display: flex;

          button {
            background-color: transparent;
            border: none;
            height: auto;
            box-shadow: none;
            padding: 16px 32px;
            margin: -12px -32px;
            width: calc(100% + 64px);
            text-align: start;
            color: ${token.colorText};
          }
        }
      }

      button[aria-label*='schema-initializer-WorkbenchBlock.ActionBar-workbench:configureActions'] {
        margin-bottom: ${token.paddingLG}px;
        margin-left: ${token.paddingLG}px;
      }
    }
  `,
}));

export const WorkbenchBlock: any = withDynamicSchemaProps(
  (props) => {
    const fieldSchema = useFieldSchema();
    const { layout = 'grid' } = fieldSchema['x-component-props'] || {};
    const { styles } = useStyles();

    return (
      <div className={`nb-action-penal-container ${layout} ${styles.containerClass}`}>
        <WorkbenchBlockContext.Provider value={{ layout }}>
          <DataSourceContext.Provider value={undefined}>
            <CollectionContext.Provider value={undefined}>{props.children}</CollectionContext.Provider>
          </DataSourceContext.Provider>
        </WorkbenchBlockContext.Provider>
      </div>
    );
  },
  { displayName: 'WorkbenchBlock' },
);

WorkbenchBlock.ActionBar = () => {
  return (
    <>
      <InternalIcons />
      <ConfigureActionsButton />
    </>
  );
};
