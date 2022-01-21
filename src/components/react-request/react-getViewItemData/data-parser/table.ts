import { _ } from 'oss-web-toolkits';
import { EMPTY_ARRAY } from '../constants';
import { IParsedResponse, ITableResult } from '../types';

/**
 * table
 * 数据columns构建的结构和antd table 的一样的
 * @param parsedResponse
 * @param columnsSetting
 * @returns
 */
const table = (parsedResponse: IParsedResponse, columnsSetting: any[]): ITableResult => {
    const { dimessions = EMPTY_ARRAY, indicatorList = EMPTY_ARRAY, rows = EMPTY_ARRAY } = parsedResponse;
    if (!parsedResponse || rows?.length === 0)
        return {
            columns: EMPTY_ARRAY,
            dataSource: EMPTY_ARRAY,
        };

    const result: ITableResult = { columns: [], dataSource: rows };

    let columnIndex = 0;
    const buildColumnItem = (item: { fieldLabel: any; fieldName: any }) => {
        const columnSetting = columnsSetting[columnIndex] || {};
        const { title, ...restColumnSetting } = columnSetting;
        result.columns.push({
            ...restColumnSetting,
            title: _.isFunction(title) ? title(item.fieldLabel) : item.fieldLabel,
            dataIndex: item.fieldName,
            key: item.fieldName,
        });
        columnIndex++;
    };

    dimessions.forEach(buildColumnItem);
    indicatorList.forEach(buildColumnItem);

    return result;
};

export { table };
