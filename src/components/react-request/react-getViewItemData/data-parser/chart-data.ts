import { _ } from 'oss-web-toolkits';
import { EMPTY_ARRAY, EMPTY_OBJECT } from '../constants';
import { IParsedResponse } from '../types';

export interface IChartDataItem {
    x?: any;
    y?: any;
    s?: string;
    __originData__?: any;
    [propsName: string]: any;
}

export interface IParseChartDataOption {
    type?: string; // 用来区分图表解析方法
    isMultiSeries?: boolean; //
    isFormatResponse?: boolean;
    dataFormatter?: (_data: any) => {};
}

export type ParseChartDataOption = IParseChartDataOption | undefined;

/**
 * dataParser.chartData.patchDimessionsDataToResponse
 * 归一化x轴的数据
 * @param parsedResponse
 * @param option
 * @returns
 */
const patchDimessionsDataToResponse = (parsedResponse: IParsedResponse, option = {}) => {
    const { dimessions = EMPTY_ARRAY, indicatorList = EMPTY_ARRAY } = parsedResponse;
    let { rows = EMPTY_ARRAY } = parsedResponse;

    const seriesField = _.get(option, 'seriesField', 'compareType');
    const seriesSortMethod = _.get(option, 'seriesSortMethod', (a: number[], b: number[]) => b[0] - a[0]);

    const seriesMapping = {};
    if (rows.length > 0 && _.isFunction(seriesSortMethod)) {
        // 合并rows,统一x轴数据
        const [xField] = dimessions;
        const [yField] = indicatorList;
        const rowsMap = new Map();
        rows.forEach((item) => {
            const x = item[xField.fieldName];
            let rowsMapItem = rowsMap.get(x);
            if (!rowsMapItem) {
                rowsMapItem = [];
                rowsMap.set(x, rowsMapItem);
            }

            const seriesItemValue = item[seriesField];
            seriesMapping[item[`${seriesField}_format`]] = seriesItemValue;

            rowsMapItem.push(item);
        });

        // 合并生成新的rows
        const newRows = [];
        const seriesMappingEntries = Object.entries(seriesMapping);
        [...rowsMap.entries()].forEach(([key, items]) => {
            seriesMappingEntries.forEach((entry) => {
                if (!items.find((item) => item[seriesField] === entry[1])) {
                    items.push({
                        [xField.fieldName]: key,
                        [`${xField.fieldName}_format`]: key,
                        [seriesField]: entry[1],
                        [`${seriesField}_format`]: entry[0],
                        [yField.fieldName]: '',
                        [`${yField.fieldName}_format`]: '',
                    });
                }
            });
            // @ts-ignore
            newRows.push(...(items || []));
        });

        // 根据系列的值进行排序
        const seriesMap = new Map();
        newRows.forEach((item) => {
            const seriesItemValue = item[seriesField];
            let group = seriesMap.get(seriesItemValue);
            if (!group) {
                group = [];
                seriesMap.set(seriesItemValue, group);
            }
            group.push(item);
        });

        rows = [...seriesMap.entries()]
            .sort(seriesSortMethod)
            .map((d) => d[1])
            // @ts-ignore
            .flat();
    }

    return {
        dimessions,
        indicatorList,
        rows,
    };
};

/**
 * dataParser.chartData.parseData
 * @param parsedResponse
 * @param option.type 预留字段可能用来区分不同类型的数据类型的解析方法
 * @returns
 */
const parseData = (parsedResponse: IParsedResponse, option: ParseChartDataOption = EMPTY_OBJECT): any => {
    const { isMultiSeries, isFormatResponse } = option;

    // -- 格式化 --
    parsedResponse = isFormatResponse && isMultiSeries ? patchDimessionsDataToResponse(parsedResponse) : parsedResponse;
    // 解构
    const { dimessions = EMPTY_ARRAY, indicatorList = EMPTY_ARRAY, rows } = parsedResponse;

    if (!parsedResponse || rows?.length === 0) return EMPTY_ARRAY;

    const [xField, seriesField] = dimessions;
    const [yField] = indicatorList;

    const result: Array<IChartDataItem> = [];

    rows?.forEach((row) => {
        const item: IChartDataItem = {
            x: row[xField.fieldName],
            y: row[yField.fieldName],
            __originData__: {
                dimessions,
                indicatorList,
                row,
            },
        };
        if (isMultiSeries) {
            item.s = row[seriesField.fieldName];
        }

        if (option.dataFormatter && _.isFunction(option.dataFormatter)) {
            option.dataFormatter(item);
        }

        result.push(item);
    });

    return result;
};

const chartData = {
    parseData,
    patchDimessionsDataToResponse,
};

export { chartData };
