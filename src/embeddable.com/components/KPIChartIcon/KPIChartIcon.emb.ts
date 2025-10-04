import { loadData } from '@embeddable.com/core';
import {
  EmbeddedComponentMeta,
  Inputs,
  defineComponent,
} from '@embeddable.com/react';

import Component from './index';
import PositionType from '../../types/Position.type.emb';
import IconNameType from '../../types/Icon.type.emb';
import { Position } from '../../enums/Position';
import { IconName } from 'lucide-react/dynamic.mjs';

export const meta = {
  name: 'KPIChartIcon',
  label: 'KPI chart with icon',
  defaultWidth: 200,
  defaultHeight: 150,
  classNames: ['inside-card'],
  category: 'Charts: essentials',
  inputs: [
    {
      name: 'ds',
      type: 'dataset',
      label: 'Dataset',
      description: 'Dataset',
      defaultValue: false,
      category: 'Chart data',
    },
    {
      name: 'metric',
      type: 'measure',
      label: 'KPI',
      required: true,
      config: {
        dataset: 'ds',
      },
      category: 'Chart data',
    },
    {
      name: 'timeProperty',
      type: 'dimension',
      label: 'Time Property',
      description: 'Used by time filters',
      config: {
        dataset: 'ds',
        supportedTypes: ['time'],
      },
      category: 'Chart data',
    },
    {
      name: 'timeFilter',
      type: 'timeRange',
      label: 'Primary date range',
      description: 'Date range',
      category: 'Variables to configure',
    },
    {
      name: 'prevTimeFilter',
      type: 'timeRange',
      label: 'Comparison date range',
      description: 'Date range',
      category: 'Variables to configure',
    },
    {
      name: 'iconName',
      type: IconNameType,
      label: 'Icon Name',
      description: 'Name of the icon to display next to the KPI',
      category: 'Chart settings',
    },
    {
      name: 'iconPosition',
      type: PositionType,
      label: 'Icon Position',
      description: 'Position of the icon relative to the KPI',
      defaultValue: 'left',
      category: 'Chart settings',
    },
    {
      name: 'title',
      type: 'string',
      label: 'Title',
      description: 'The title for the chart',
      category: 'Chart settings',
    },
    {
      name: 'description',
      type: 'string',
      label: 'Description',
      description: 'The description for the chart',
      category: 'Chart settings',
    },
    {
      name: 'showPrevPeriodLabel',
      type: 'boolean',
      label: 'Display comparison period label',
      defaultValue: true,
      category: 'Chart settings',
    },
    {
      name: 'showNullValuesAsZero',
      type: 'boolean',
      label: 'Show null values as zero',
      description: 'Null values will be displayed as 0 if true or -- if false',
      defaultValue: true,
      category: 'Chart settings',
    },
    {
      name: 'prefix',
      type: 'string',
      label: 'Prefix',
      description: 'Prefix',
      category: 'Chart settings',
    },
    {
      name: 'suffix',
      type: 'string',
      label: 'Suffix',
      description: 'Suffix',
      category: 'Chart settings',
    },
    {
      name: 'dps',
      type: 'number',
      label: 'Decimal Places',
      category: 'Formatting',
    },
    {
      name: 'fontSize',
      type: 'number',
      label: 'Text size in pixels',
      defaultValue: 44,
      category: 'Formatting',
    },
    {
      name: 'enableDownloadAsCSV',
      type: 'boolean',
      label: 'Show download as CSV',
      category: 'Export options',
      defaultValue: false,
    },
    {
      name: 'enableDownloadAsPNG',
      type: 'boolean',
      label: 'Show download as PNG',
      category: 'Export options',
      defaultValue: false,
    },
  ],
} as const satisfies EmbeddedComponentMeta;

export default defineComponent(Component, meta, {
  props: (inputs: Inputs<typeof meta>) => {
    return {
      ...inputs,
      iconName: inputs.iconName as IconName,
      iconPosition: inputs.iconPosition as Position,
      results: loadData({
        from: inputs.ds,
        select: [inputs.metric],
        filters:
          inputs.timeFilter?.from && inputs.timeProperty
            ? [
                {
                  property: inputs.timeProperty,
                  operator: 'inDateRange',
                  value: inputs.timeFilter,
                },
              ]
            : undefined,
      }),
      prevResults:
        inputs.timeProperty &&
        loadData({
          from: inputs.ds,
          select: [inputs.metric],
          limit: !inputs.prevTimeFilter?.from ? 1 : undefined,
          filters: inputs.prevTimeFilter?.from
            ? [
                {
                  property: inputs.timeProperty,
                  operator: 'inDateRange',
                  value: {
                    from: inputs.prevTimeFilter.from,
                    relativeTimeString: '',
                    to: inputs.prevTimeFilter.to,
                  },
                },
              ]
            : undefined,
        }),
    };
  },
});
