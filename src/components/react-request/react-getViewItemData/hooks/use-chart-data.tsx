import { useMemo, useRef } from 'react';
import { _ } from 'oss-web-toolkits';
import { EMPTY_OBJECT, EMPTY_ARRAY } from '../constants';
import { IChartDataItem, ParseChartDataOption } from '../data-parser/chart-data';
import { dataParser } from '../index';
import { useMemorizedObject } from './use-memorized-object';

const useChartData = (ownerData: IChartDataItem[], parsedResponse: any = EMPTY_OBJECT, parseOption: ParseChartDataOption) => {
    const _memorizedParseOption = useMemorizedObject(parseOption);
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
        if (hasPropsData || Object.keys(parsedResponse || EMPTY_OBJECT).length === 0) {
            return _dataCacheRef.current;
        }

        const newData = dataParser.chartData.parseData(parsedResponse, _memorizedParseOption);
        if (!_.isEqual(newData, _dataCacheRef.current)) {
            // @ts-ignore
            _dataCacheRef.current = newData;
            return newData;
        }

        return _dataCacheRef.current;
    }, [ownerData, parsedResponse, _memorizedParseOption]);

    return [data];
};

export { useChartData };
