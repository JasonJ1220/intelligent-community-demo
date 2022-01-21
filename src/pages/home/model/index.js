import attachModelGen, { createStore } from '@Common/common-model-manage-message';
import * as constantsMap from './constants';

const { DEMO_CONSTANT } = constantsMap;

const initialState = {
    [DEMO_CONSTANT]: undefined,
};
// 初始化本项目的store
export const store = createStore(initialState, { ...constantsMap });

export { constantsMap };

export const attachModel = attachModelGen(store);
