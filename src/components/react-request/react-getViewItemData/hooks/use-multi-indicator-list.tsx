import { useMemo, useRef } from 'react';
import { _ } from 'oss-web-toolkits';
import { IParsedResponse, IMapIndicatorListIndexToResult, dataParser } from '../index';

import { useMemorizedObject } from './use-memorized-object';
import { EMPTY_OBJECT, EMPTY_ARRAY } from '../constants';

/**
 * useMultiIndicatorList
 * @param ownerData
 * @param parsedResponse
 * @param option
 * @returns
 */
export const useMultiIndicatorList = (ownerData: any[], parsedResponse: IParsedResponse = EMPTY_OBJECT, option: IMapIndicatorListIndexToResult) => {
    const _memorizedOption = useMemorizedObject(option);
    const _dataCacheRef = useRef(EMPTY_ARRAY);
    const data = useMemo(() => {
        let hasPropsData = false;
        if (ownerData && !_.isEqual(_dataCacheRef.current, ownerData)) {
            if (ownerData?.length) {
                hasPropsData = true;
                // @ts-ignore
                _dataCacheRef.current = ownerData;
                return ownerData;
            }
        }
        if (hasPropsData || Object.keys(parsedResponse || EMPTY_OBJECT).length === 0) return _dataCacheRef.current;

        const newData = dataParser.multiIndicatorList(parsedResponse, _memorizedOption);
        if (!_.isEqual(_dataCacheRef.current, newData)) {
            // @ts-ignore
            _dataCacheRef.current = newData;
            // setData(newData);
            return newData;
        }
        return _dataCacheRef.current;
    }, [ownerData, parsedResponse, _memorizedOption]);

    return [data];
};
