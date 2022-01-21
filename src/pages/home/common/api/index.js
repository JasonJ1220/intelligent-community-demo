import viewService from '@Common/services/sceneViewService';

export function getViewItemData(viewItemId, viewPageId, viewPageArgs, cbSuccess = () => {}, cbError = () => {}) {
    return viewService.getViewItemData('viewService', viewItemId, viewPageId, viewPageArgs, cbSuccess, cbError);
}

function getViewItemGroupData(viewItemId, viewPageId, viewPageArgs, cbSuccess) {
    return viewService.getViewItemGroupData('viewService', viewItemId, viewPageId, viewPageArgs, cbSuccess);
}

function getViewItemFieldDetail(viewItemId, viewPageId, viewPageArgs, cbSuccess) {
    return viewService.getViewItemFieldDetail('viewService', viewItemId, viewPageId, viewPageArgs, cbSuccess);
}

const sceneViewService = {
    getViewItemData,
    getViewItemGroupData,
    getViewItemFieldDetail,
};

export default sceneViewService;
