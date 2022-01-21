import { createViewItemDataRequestHoc, createWithMultiIndicatorListHoc } from '@Components/react-request';
import { getViewItemData } from './index';

const withViewItemDataRequest = createViewItemDataRequestHoc(getViewItemData);
const withMultiIndicatorList = createWithMultiIndicatorListHoc(getViewItemData);

export { withViewItemDataRequest, withMultiIndicatorList };
