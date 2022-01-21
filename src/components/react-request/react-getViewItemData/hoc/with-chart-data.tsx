import React from 'react';
// import { _ } from 'oss-web-toolkits';
import { createViewItemDataRequestHoc } from './react-view-item-data';
import { IHocForwardCompProps } from '../types';
import { useChartData } from '../hooks/use-chart-data';

/**
 * withChartData
 * @param withChartData
 * @param Comp
 * @returns
 */
export const withChartData = (viewRequestApi: Function, Comp: any) => {
    const forwardComponent = React.forwardRef((props: IHocForwardCompProps, ref) => {
        const [data] = useChartData(props.data, props.parsedResponse, {
            isMultiSeries: props.isMultiSeries,
            isFormatResponse: props.isFormatResponse,
            dataFormatter: props.dataFormatter,
        });
        return <Comp {...props} data={data} ref={ref} />;
    });

    forwardComponent.displayName = `withChartData(${Comp.name || Comp.displayName})`;
    forwardComponent.defaultProps = {
        ...(Comp.defaultProps || {}),
    };
    forwardComponent.propTypes = {
        ...(Comp.propTypes || {}),
    };
    return createViewItemDataRequestHoc(viewRequestApi)(forwardComponent);
};

/**
 * createWithChartDataHoc
 * @param viewRequestApi
 * @returns
 */
export const createWithChartDataHoc = (viewRequestApi: Function) => (Comp: any) => withChartData(viewRequestApi, Comp);
