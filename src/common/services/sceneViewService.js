import { _ } from 'oss-web-toolkits';
import proxy from '@Src/common/api';

/**
 * 视图服务接口
 */

// const DEFAULT_BASE_URL = 'sceneViewServerUrl'; //视图服务接口地址

function getViewItemData(baseUrlType, viewItemId, viewPageId, viewPageArgs, cbSuccess = _.noop, cbError = _.noop) {
    let data = {
        requestInfo: {
            clientRequestId: 'clientRequestId-b7f94535-e9b9-4e97-9ee6-3ba533a792b2',
            clientToken: 'Token-12333',
        },
        viewItemId: viewItemId,
        viewPageArgs: {
            ...viewPageArgs,
        },
        viewPageId: viewPageId,
    };

    const request = proxy('view/getViewItemData', {
        type: 'post',
        showSuccessMessage: false,
        baseUrlType,
        // baseUrlType: fullUrl ? '' : DEFAULT_BASE_URL,
        showErrorMessage: false,
        defaultErrorMessage: '获取数据失败',
        data: data,
    });

    request
        .then((result) => {
            cbSuccess(result);
            return result;
        })
        .catch((result) => {
            cbError(result);
            return Promise.reject(result);
        });

    return request;
}

function getViewItemGroupData(fullUrl, viewItemId, viewPageId, cbSuccess) {
    let data = {
        requestInfo: {
            clientRequestId: 'clientRequestId',
            clientToken: 'clientToken',
        },
        viewItemId: viewItemId,
        viewPageArgs: {},
        viewPageId: viewPageId,
    };
    proxy('view/getViewItemGroupData', {
        type: 'post',
        showSuccessMessage: false,
        data: data,
    }).then((result) => {
        cbSuccess(result);
    });
}

function getViewItemFieldDetail(fullUrl, viewItemId, viewPageId, cbSuccess) {
    let data = {
        requestInfo: {
            clientRequestId: 'clientRequestId',
            clientToken: 'clientToken',
        },
        viewItemId: viewItemId,
        viewPageArgs: {},
        viewPageId: viewPageId,
    };
    proxy('view/getViewItemFieldDetail', {
        type: 'post',
        showSuccessMessage: false,
        data: data,
    }).then((result) => {
        cbSuccess(result);
    });
}

const sceneViewService = {
    getViewItemData,
    getViewItemGroupData,
    getViewItemFieldDetail,
};

export default sceneViewService;
