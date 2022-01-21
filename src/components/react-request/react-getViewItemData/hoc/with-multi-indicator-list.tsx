import React from 'react';
import { _ } from 'oss-web-toolkits';
import { createViewItemDataRequestHoc } from './react-view-item-data';
import { useMultiIndicatorList, useMemorizedObject } from '../hooks';
import { IHocForwardCompProps } from '../types';

/**
 * 多指标展示组件
 * @param viewRequestApi
 * @param Comp
 * @returns
 */
export const withMultiIndicatorList = (viewRequestApi: Function, Comp: any) => {
    const forwardComponent = React.forwardRef((props: IHocForwardCompProps, ref) => {
        const _parseDataOption = useMemorizedObject({
            mapIndicatorListIndexToResult: props.mapIndicatorListIndexToResult,
            hasGroup: props.hasGroup,
        });
        const [data] = useMultiIndicatorList(props.data, props.parsedResponse, _parseDataOption);
        const CompProps = _.omit(props, 'mapIndicatorListIndexToResult', 'hasGroup') || {};

        return <Comp {...CompProps} data={data} ref={ref} />;
    });

    forwardComponent.displayName = `withMultiIndicatorList(${Comp.name || Comp.displayName})`;
    forwardComponent.defaultProps = {
        mapIndicatorListIndexToResult: undefined, // 指定指标映射的规则
        hasGroup: false,
        ...(Comp.defaultProps || {}),
    };
    forwardComponent.propTypes = {
        ...(Comp.propTypes || {}),
    };
    return createViewItemDataRequestHoc(viewRequestApi)(forwardComponent);
};

/**
 * 创建单指标代发请求高阶组件
 * @param viewRequestApi
 * @returns
 */
export const createWithMultiIndicatorListHoc = (viewRequestApi: Function) => (Comp: any) => withMultiIndicatorList(viewRequestApi, Comp);
