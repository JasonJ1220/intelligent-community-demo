import { Default as DefaultTitle } from '../box/titles';
import { Default as DefaultContainer } from '../box/containers';

/**
 * 容器组件的key: component映射
 */
export const containersMap = new Map([
    [
        'default',
        {
            label: '默认容器',
            component: DefaultContainer,
        },
    ],
]);

/**
 * 头部title组件的key: component映射
 */
export const headersMap = new Map([
    [
        'default',
        {
            label: '默认标题组件',
            component: DefaultTitle,
        },
    ],
]);

/**
 * 所有可用组件的key: info映射
 */
export const componentsMap = new Map([]);
/**
 * 所有可用占位组件的key: component映射
 */
export const placeholdersMap = new Map([]);
