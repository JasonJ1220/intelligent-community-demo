import { ISingleValueResult, IParsedResponse, IMapIndicatorListIndexToResult } from '../types';
import { defaultMapIndicatorListIndexToResult } from './single-value';
import { EMPTY_ARRAY, EMPTY_OBJECT } from '../constants';

export interface IParseMultiIndicatorListOption {
    mapIndicatorListIndexToResult?: IMapIndicatorListIndexToResult;
    hasGroup?: boolean | undefined;
}

/**
 * dataParser.multiIndicatorList
 * @param parsedResponse
 * @param option
 * @returns
 */
const multiIndicatorList = (parsedResponse: IParsedResponse, option: IParseMultiIndicatorListOption = EMPTY_OBJECT): ISingleValueResult[] => {
    const { dimessions, indicatorList = EMPTY_ARRAY, rows = EMPTY_ARRAY } = parsedResponse;
    if (!parsedResponse || rows?.length === 0) return rows;

    const { hasGroup, mapIndicatorListIndexToResult = defaultMapIndicatorListIndexToResult } = option;

    const result: ISingleValueResult[] = [];

    rows.forEach((row) => {
        const resultItem: ISingleValueResult = {};
        resultItem.name = row[indicatorList[mapIndicatorListIndexToResult.name]?.fieldName];
        resultItem.value = row[indicatorList[mapIndicatorListIndexToResult.value]?.fieldName];
        resultItem.unit = row[indicatorList[mapIndicatorListIndexToResult.unit]?.fieldName];
        resultItem.id = row[indicatorList[mapIndicatorListIndexToResult.id]?.fieldName];
        if (hasGroup) {
            // 这里应该还有个分组id的,但是这个字段不一定会有，所以留在业务中解析吧
            resultItem.group = row[indicatorList[mapIndicatorListIndexToResult.group]?.fieldName];
        }
        resultItem.__originData__ = {
            dimessions,
            indicatorList,
            row,
        };
        result.push(resultItem);
    });

    return result;
};

export { multiIndicatorList };
