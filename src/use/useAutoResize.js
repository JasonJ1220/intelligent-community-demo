import { useState, useCallback, useEffect, useRef, useImperativeHandle } from 'react';
import { _ } from 'oss-web-toolkits';

/**
 * 观察器
 * @param dom
 * @param callback
 * @returns
 */
export function observerDomResize(dom, callback, observeOption) {
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

    const observer = new MutationObserver(callback);
    observer.observe(dom, {
        attributes: true,
        attributeFilter: ['style'],
        attributeOldValue: true,
        ...(observeOption || {}),
    });

    return observer;
}

export default function useAutoResize(ref, observeOption) {
    const [state, setState] = useState({ width: 0, height: 0 });
    const domRef = useRef(null);
    const setWH = useCallback(() => {
        if (domRef.current) {
            const { clientWidth, clientHeight } = domRef.current;
            setState({ width: clientWidth, height: clientHeight });
        }
    }, []);

    useImperativeHandle(
        ref,
        () => ({ setWH }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    useEffect(() => {
        const debounceWithSetWH = _.debounce(setWH, 100);
        debounceWithSetWH();
        const domObserver = observerDomResize(domRef.current, debounceWithSetWH, observeOption);
        window.addEventListener('resize', debounceWithSetWH);
        return () => {
            domObserver.disconnect();
            domObserver.takeRecords();
            window.removeEventListener('resize', debounceWithSetWH);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { ...state, domRef, setWH };
}
