import { useState, useEffect, useRef, useMemo } from 'react';
import { _ } from 'oss-web-toolkits';
import { initGetViewItemDataHelper } from './index';
import { TRequestParams } from './request-data-helper';

interface IOption extends TRequestParams {
    loggerPrefix?: string;
}

/**
 * useIntervalViewItemData
 * @param option.loggerPrefix
 * @param option.url
 * @param option.viewPageArgs
 * @param option.viewPageId
 * @param option.viewItemId
 * @param option.interval
 * @param option.mockData
 * @returns
 */
const useIntervalViewItemData = (option: IOption) => {
    const { url, viewPageArgs, viewPageId, viewItemId, mockData, interval } = option;

    const [result, setResult] = useState();
    const mockDataRef = useRef(mockData);
    const helperRef = useRef(
        initGetViewItemDataHelper(
            {},
            {
                loggerPrefix: option.loggerPrefix,
                onIntervalData: (result) => {
                    setResult(result);
                },
            }
        )
    );

    const viewPageArgsRef = useRef(viewPageArgs);
    const memorizedviewPageArgs = useMemo(() => {
        if (!_.isEqual(viewPageArgsRef.current, viewPageArgs)) {
            viewPageArgsRef.current = viewPageArgs;
        }
        return viewPageArgsRef.current;
    }, [viewPageArgs]);

    useEffect(() => {
        const helper = helperRef.current;
        helper.requestDataListInterval({
            url,
            viewPageArgs: memorizedviewPageArgs,
            viewItemId,
            viewPageId,
            mockData: mockDataRef.current,
            interval,
        });
    }, [viewItemId, memorizedviewPageArgs, viewPageId, url, interval]);

    useEffect(() => {
        const helper = helperRef.current;
        return () => {
            helper.destroy();
        };
    }, []);

    return {
        helper: helperRef.current,
        result,
    };
};

export { useIntervalViewItemData };
