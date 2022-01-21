import { useRef, useMemo } from 'react';
import { _ } from 'oss-web-toolkits';
import { useMemorizedObject } from './use-memorized-object';
import { IParsedResponse, IMapIndicatorListIndexToResult, dataParser } from '../index';
import { EMPTY_OBJECT } from '../constants';

/**
 * useSingleValue
 * @param ownerData
 * @param parsedResponse
 * @param option
 * @returns
 */
export const useSingleValue = (ownerData: object, parsedResponse: IParsedResponse = EMPTY_OBJECT, option: IMapIndicatorListIndexToResult) => {
    const _memorizedOption = useMemorizedObject(option);
    const _dataCacheRef = useRef(EMPTY_OBJECT);
    const data = useMemo(() => {
        let hasPropsData = false;
        if (ownerData && !_.isEqual(_dataCacheRef.current, ownerData)) {
            if (ownerData) {
                hasPropsData = true;
                // @ts-ignore
                _dataCacheRef.current = ownerData;
                return ownerData;
            }
        }
        if (hasPropsData || Object.keys(parsedResponse || EMPTY_OBJECT).length === 0) {
            return _dataCacheRef.current;
        }
        const newData = dataParser.singleValue(parsedResponse, _memorizedOption);
        if (!_.isEqual(_dataCacheRef.current, newData)) {
            // @ts-ignore
            _dataCacheRef.current = newData;
            return newData;
        }
        return _dataCacheRef.current;
    }, [parsedResponse, _memorizedOption, ownerData]);

    return [data];
};
