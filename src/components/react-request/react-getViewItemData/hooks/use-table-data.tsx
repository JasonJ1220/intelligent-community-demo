import { useRef, useMemo } from 'react';
import { _ } from 'oss-web-toolkits';
import { EMPTY_ARRAY, EMPTY_OBJECT } from '../constants';
import { ITableResult } from '../types';
import { dataParser } from '../index';
import { useMemorizedObject } from './use-memorized-object';

/**
 * useTableData
 * @param ownerData
 * @param parsedResponse
 * @param option.columnsSetting 向columns注入配置
 * @returns
 */
const useTableData = (ownerData: ITableResult, parsedResponse: any = EMPTY_OBJECT, option: object | undefined) => {
    const _memorizedOption = useMemorizedObject(option);
    const _dataCacheRef = useRef({ columns: EMPTY_ARRAY, dataSource: EMPTY_ARRAY });
    const data = useMemo(() => {
        let hasPropsData = false;
        if (ownerData && !_.isEqual(_dataCacheRef.current, ownerData)) {
            if (ownerData?.columns.length > 0) {
                hasPropsData = true;
                // @ts-ignore
                _dataCacheRef.current = ownerData;
                return ownerData;
            }
        }
        if (hasPropsData || Object.keys(parsedResponse || EMPTY_OBJECT).length === 0) {
            return _dataCacheRef.current;
        }

        const newData = dataParser.table(parsedResponse, _memorizedOption?.columnsSetting || EMPTY_ARRAY);
        if (!_.isEqual(newData, _dataCacheRef.current)) {
            // @ts-ignore
            _dataCacheRef.current = ownerData;
            return newData;
        }

        return _dataCacheRef.current;
    }, [ownerData, parsedResponse, _memorizedOption]);

    return [data];
};

export { useTableData };
