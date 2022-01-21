import React from 'react';
// import { _ } from 'oss-web-toolkits';
import { createViewItemDataRequestHoc } from './react-view-item-data';
import { IHocForwardCompProps } from '../types';
import { useTableData } from '../hooks';

/**
 * withTableData
 * @param withChartData
 * @param Comp
 * @returns
 */
export const withTableData = (viewRequestApi: Function, Comp: any) => {
    const forwardComponent = React.forwardRef((props: IHocForwardCompProps, ref) => {
        const { columnsSetting, ...restProps } = props;
        const [data] = useTableData(props.data, props.parsedResponse, { columnsSetting });

        // @ts-ignore
        return <Comp {...restProps} columns={data?.columns} dataSource={data?.dataSource} ref={ref} />;
    });

    forwardComponent.displayName = `withTableData(${Comp.name || Comp.displayName})`;
    forwardComponent.defaultProps = {
        columnsSetting: undefined,
        ...(Comp.defaultProps || {}),
    };
    forwardComponent.propTypes = {
        ...(Comp.propTypes || {}),
    };
    return createViewItemDataRequestHoc(viewRequestApi)(forwardComponent);
};

/**
 * createWithTableDataHoc
 * @param viewRequestApi
 * @returns
 */
export const createWithTableDataHoc = (viewRequestApi: Function) => (Comp: any) => withTableData(viewRequestApi, Comp);
