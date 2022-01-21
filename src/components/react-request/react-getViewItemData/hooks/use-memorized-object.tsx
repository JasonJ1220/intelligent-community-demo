import { useMemo, useRef } from 'react';
import { _ } from 'oss-web-toolkits';

export const useMemorizedObject = (obj: object | undefined): any => {
    const objRef = useRef(obj);
    return useMemo(() => {
        if (obj && !_.isEqual(objRef.current, obj)) {
            objRef.current = obj;
        }
        return objRef.current;
    }, [obj]);
};
