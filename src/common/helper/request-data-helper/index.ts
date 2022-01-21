// @ts-ignore
import sceneViewService from '@Src/common/services/sceneViewService';
import RequestDataHelper, { THelpserOption } from './request-data-helper';
import { useIntervalViewItemData } from './hooks';

/**
 * initGetViewItemDataHelper 初始化一个请求数据的helper
 * @param option  请求的数据
 * @returns
 */
const initGetViewItemDataHelper = (context: any, option: THelpserOption) => {
    const helper = new RequestDataHelper(context, option);

    helper.requestApi = sceneViewService.getViewItemData;
    return helper;
};

export { initGetViewItemDataHelper, useIntervalViewItemData };
