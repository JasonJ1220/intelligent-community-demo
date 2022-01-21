import { IParsedResponse, ISingleValueResult, IMapIndicatorListIndexToResult } from '../types';
import { EMPTY_ARRAY, EMPTY_OBJECT } from '../constants';

// 在indicators中指定的字段顺序是[nameField,valueField,unitField,idField,groupField,groupIdField ...]
export const defaultMapIndicatorListIndexToResult = {
    name: 0,
    value: 1,
    unit: 2,
    id: 3,
    group: 4, // 分组
};

/**
 * dataParser.singleValue
 * @param parsedResponse 视图服务转换后的响应
 * @param mapIndicatorListIndexToResult 指标映射规则
 * @returns
 */
const singleValue = (
    parsedResponse: IParsedResponse,
    mapIndicatorListIndexToResult: IMapIndicatorListIndexToResult = defaultMapIndicatorListIndexToResult
): ISingleValueResult => {
    const { indicatorList = EMPTY_ARRAY, rows = EMPTY_ARRAY, dimessions } = parsedResponse;

    if (!parsedResponse || rows?.length === 0) return EMPTY_OBJECT;
    const result: ISingleValueResult = {};

    rows.slice(0, 1).forEach((row) => {
        result.name = row[indicatorList[mapIndicatorListIndexToResult.name]?.fieldName];
        result.value = row[indicatorList[mapIndicatorListIndexToResult.value]?.fieldName];
        result.unit = row[indicatorList[mapIndicatorListIndexToResult.unit]?.fieldName];
        result.id = row[indicatorList[mapIndicatorListIndexToResult.id]?.fieldName];
        result.__originData__ = {
            row,
            indicatorList,
            dimessions,
        };
    });

    return result;
};

export { singleValue };
