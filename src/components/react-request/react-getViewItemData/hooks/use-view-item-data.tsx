import { useEffect, useMemo, useRef, useState } from 'react';
import { _, logger } from 'oss-web-toolkits';
import { IUseViewItemDataProps, IRequestActionsRef, IUseViewItemDataResult } from '../index';
import { getResponseHeader, getResponseRows } from '../data-parser/utils';
// @ts-ignore
import initTimer, { interval as TIMER_INTERVAL } from '@Common/timer';

import { EMPTY_OBJECT, SYMBOL_ABORT_REQUEST, REQUEST_STATUS } from '../constants';

type viewRequestApiArgs = undefined | Pick<IUseViewItemDataProps, 'viewItemId' | 'viewPageId' | 'viewPageArgs' | 'fullUrl'>;

/**
 * useViewItemData
 * @param {function} viewRequestApi 使用视图请求服务(viewItemId,viewPageId,viewPageArgs),这里动态传url
 * @param {*} option.viewItemId
 * @param {*} option.viewPageId
 * @param {*} option.viewPageArgs
 * @param {*} option.interval 默认 5min; false不使用定时器
 * @param {*} option.requestTimerPlay 自动播放的开关
 * @param {*} option.loggerPrefix log前缀
 * @param {*} option.loggerVisible log显示隐藏开关
 * @returns {object}  {parsedResponse, response, requestCount, actions}
 */
const useViewItemData = (viewRequestApi: Function, option: IUseViewItemDataProps): IUseViewItemDataResult => {
    const {
        fullUrl,
        viewItemId,
        viewPageId,
        viewPageArgs = EMPTY_OBJECT,

        // 定时器
        interval = TIMER_INTERVAL.second * 5,
        requestTimerPlay,

        loggerPrefix,
        loggerVisible,
    } = option || EMPTY_OBJECT;

    const requestCountRef = useRef(0);
    const [requestResponse, setRequestResponse] = useState({ response: {}, parsedResponse: {}, requestCount: 0 });
    const requestActionsRef: IRequestActionsRef = useRef({});

    const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);

    // 缓存请求参数
    const viewPageArgsRef = useRef(EMPTY_OBJECT);
    const _memorizedViewPageArgs = useMemo(() => {
        if (!_.isEqual(viewPageArgsRef.current, viewPageArgs)) {
            viewPageArgsRef.current = viewPageArgs;
        }
        return viewPageArgsRef.current;
    }, [viewPageArgs]);
    const debugloggerRef = useRef({ prefix: loggerPrefix, visible: loggerVisible });

    // 请求逻辑
    useEffect(() => {
        let requestAbortFlag = false;
        const requestData = (params: viewRequestApiArgs = EMPTY_OBJECT): any => {
            // 取消请求
            const abortRequestPromise = new Promise((...args) => {
                const reject = args[1];
                if (requestActionsRef.current.abort) {
                    requestActionsRef.current.abort(SYMBOL_ABORT_REQUEST);
                }
                requestActionsRef.current.abort = reject;
            });

            // 请求参数
            const _viewItemId = _.get(params, 'viewItemId', viewItemId);
            const _viewPageId = _.get(params, 'viewPageId', viewPageId);
            const _viewPageArgs = _.get(params, 'viewPageArgs', _memorizedViewPageArgs);
            const _fullUrl = _.get(params, 'fullUrl', fullUrl);

            // 两个必传的参数
            if (_.isUndefined(_viewItemId) || _.isUndefined(_viewPageId)) {
                return Promise.reject(SYMBOL_ABORT_REQUEST);
            }

            const requestApiArguments = [_viewItemId, _viewPageId, _viewPageArgs];
            if (_fullUrl) {
                requestApiArguments.unshift(_fullUrl);
            }

            if (debugloggerRef.current.visible) {
                // @ts-ignore
                logger.default.debug({
                    desc: `${debugloggerRef.current.prefix || ''}请求参数`,
                    viewItemId: _viewItemId,
                    viewPageId: _viewPageId,
                    viewPageArgs: _viewPageArgs,
                });
            }

            setRequestStatus(REQUEST_STATUS.LOADING);
            const requestViewItemData = viewRequestApi(...requestApiArguments);
            return Promise.race([abortRequestPromise, requestViewItemData])
                .then((res) => {
                    if (requestAbortFlag) return;

                    if (debugloggerRef.current.visible) {
                        // @ts-ignore
                        logger.default.debug({
                            desc: `${debugloggerRef.current.prefix || ''}请求响应`,
                            viewItemId: _viewItemId,
                            viewPageId: _viewPageId,
                            viewPageArgs: _viewPageArgs,
                            res,
                        });
                    }

                    // 初步解析响应
                    const header = getResponseHeader(res);
                    const rows = getResponseRows(res);

                    const result = {
                        response: res,
                        parsedResponse: {
                            ...header,
                            rows,
                        },
                        requestCount: ++requestCountRef.current,
                    };

                    setRequestStatus(rows?.length > 0 ? REQUEST_STATUS.SUCCESS : REQUEST_STATUS.EMPTY);
                    setRequestResponse(result);

                    return result;
                })
                .catch((e) => {
                    if (requestAbortFlag || e === SYMBOL_ABORT_REQUEST) {
                        // 当取消的时候，维持现状
                        setRequestStatus(REQUEST_STATUS.SUCCESS);
                        return Promise.reject(e);
                    }
                    setRequestStatus(REQUEST_STATUS.ERROR);
                    // 其他出错的时候处理
                    setRequestResponse({
                        response: {},
                        parsedResponse: {},
                        requestCount: ++requestCountRef.current,
                    });
                    return Promise.reject(e);
                });
        };

        let timer = initTimer(requestData, interval, false);
        requestData();

        requestActionsRef.current.reload = requestData;
        requestActionsRef.current.timer = timer;
        return () => {
            requestAbortFlag = true;
            timer.clear();
            timer = null;
        };
    }, [_memorizedViewPageArgs, fullUrl, interval, viewItemId, viewPageId, viewRequestApi]);

    // timer
    useEffect(() => {
        if (interval === false) return;

        const timer = requestActionsRef.current.timer;
        if (requestTimerPlay) {
            const timerRunning = timer?.getStatus();
            if (!timerRunning) timer?.start();
        } else {
            timer?.pause();
        }
    }, [requestTimerPlay, interval]);

    return {
        ...requestResponse,
        requestStatus,
        actions: {
            // action中不提供定时器启停的方法？？
            abort: requestActionsRef.current.abort,
            reload: requestActionsRef.current.reload,
        },
    };
};

/**
 * createUseViewItemData
 * @param viewRequestApi
 * @returns
 */
const createUseViewItemData = (viewRequestApi: Function) => (option: IUseViewItemDataProps) => useViewItemData(viewRequestApi, option);

export { useViewItemData, createUseViewItemData };
