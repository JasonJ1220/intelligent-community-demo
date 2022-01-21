import React from 'react';
import { _ } from 'oss-web-toolkits';
import { createViewItemDataRequestHoc } from './react-view-item-data';
import { useSingleValue } from '../hooks';
import { IHocForwardCompProps } from '../types';

/**
 * 单指标展示高阶组件
 * @param viewRequestApi
 * @param Comp
 * @returns
 */
export const withSingleValue = (viewRequestApi: Function, Comp: any) => {
    const forwardComponent = React.forwardRef((props: IHocForwardCompProps, ref) => {
        const [data] = useSingleValue(props.data, props.parsedResponse, props.mapIndicatorListIndexToResult);
        const CompProps = _.omit(props, 'mapIndicatorListIndexToResult') || {};

        return <Comp {...CompProps} data={data} ref={ref} />;
    });

    forwardComponent.displayName = `withSingleValue(${Comp.name || Comp.displayName})`;
    forwardComponent.defaultProps = {
        mapIndicatorListIndexToResult: undefined, // 指定指标映射的规则
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
export const createWithSingleValueHoc = (viewRequestApi: Function) => (Comp: any) => withSingleValue(viewRequestApi, Comp);
