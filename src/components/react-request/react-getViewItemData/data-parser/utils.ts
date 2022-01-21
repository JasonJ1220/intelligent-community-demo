import { _ } from 'oss-web-toolkits';
import { IParsedHeader } from '../types';

/**
 * 获取header
 * @param res
 * @returns
 */
export const getResponseHeader = (res: object): IParsedHeader => {
    return {
        dimessions: _.get(res, 'data.viewItemData.header.dimFieldList', []),
        indicatorList: _.get(res, 'data.viewItemData.header.counterFieldList', []),
    };
};

/**
 * 获取rows
 * @param res
 * @returns
 */
export const getResponseRows = (res: object): Array<object> => {
    return _.get(res, 'data.viewItemData.rows', []);
};

/**
 * 构建视图服务响应的数据
 * @param param0
 * @returns
 */
export const buildViewItemDataResponse = ({ dimessions, indicatorList, rows }) => {
    return {
        data: {
            viewItemData: {
                header: { dimFieldList: dimessions, counterFieldList: indicatorList },
                rows,
            },
        },
    };
};
