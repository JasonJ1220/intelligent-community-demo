import React, { useEffect } from 'react';
import { DataStatus } from 'oss-ui';
import { IHocProps } from '../types';
import { useViewItemData } from '../hooks/use-view-item-data';
import { EMPTY_OBJECT, REQUEST_STATUS } from '../constants';

// 转换请求使用的参数
const transformUseViewItemDataOption = (_props: object): object => EMPTY_OBJECT;

/**
 * withViewItemDataRequest
 * @param viewRequestApi
 * @param Comp
 * @param transformPropsToRequestOption
 * @returns
 */
const withViewItemDataRequest = (viewRequestApi: Function, Comp: any, transformPropsToRequestOption = transformUseViewItemDataOption) => {
    const forwardComponent = React.forwardRef((props: IHocProps = EMPTY_OBJECT, ref) => {
        const {
            fullUrl,
            viewItemId,
            viewPageId,
            viewPageArgs,
            interval,
            requestTimerPlay,

            loggerPrefix,
            loggerVisible,

            onRequestChange,
            dataStatusProps,
            dataStatusVisible,
        } = props;
        const option = transformPropsToRequestOption(props);
        const { parsedResponse, response, requestCount, requestStatus, actions: requestActions } = useViewItemData(viewRequestApi, {
            fullUrl,
            viewItemId,
            viewPageId,
            viewPageArgs,

            loggerPrefix,
            loggerVisible,

            interval,
            requestTimerPlay,

            ...option,
        });

        useEffect(() => {
            if (onRequestChange) {
                onRequestChange({ parsedResponse, response, requestCount });
            }
        }, [requestCount, onRequestChange, parsedResponse, response]);

        let _comp: any = (
            <Comp
                {...props}
                ref={ref}
                parsedResponse={parsedResponse}
                response={response}
                requestActions={requestActions}
                requestCount={requestCount}
                requestStatus={requestStatus}
            />
        );

        if (dataStatusVisible && requestStatus !== REQUEST_STATUS.SUCCESS) {
            _comp = <DataStatus {...dataStatusProps} status={requestStatus} />;
        }

        return _comp;
    });

    forwardComponent.displayName = `withViewItemDataRequest(${Comp.name || Comp.displayName})`;
    forwardComponent.defaultProps = {
        dataStatusVisible: true,
        dataStatusProps: {},
        loggerPrefix: undefined,
        loggerVisible: true,
        ...(Comp.defaultProps || {}),
    };
    forwardComponent.propTypes = {
        ...(Comp.propTypes || {}),
    };
    return forwardComponent;
};

/**
 * createViewItemDataRequestHoc
 * @param viewRequestApi 指定使用请求方法
 * @returns
 */
const createViewItemDataRequestHoc = (viewRequestApi: Function) => (
    Comp: any,
    transformPropsToRequestOption?: ((_props: object) => object) | undefined,
) => withViewItemDataRequest(viewRequestApi, Comp, transformPropsToRequestOption);

export {
    withViewItemDataRequest,
    createViewItemDataRequestHoc, // hoc,
    useViewItemData,
};
