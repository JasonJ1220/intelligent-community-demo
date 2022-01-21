import { _, logger, EventClass } from 'oss-web-toolkits';
// @ts-ignore
import initTimer, { interval as timerInterval } from '@Common/timer';
// @ts-ignore
import Enums from '@Common/enum';

export type THelpserOption = {
    loggerPrefix?: string | undefined;
    silentUpdate?: boolean;

    verifyRequestParams?: (params: any) => boolean;
    interval?: number;
    onIntervalData?: undefined | ((...args: any) => any);
};

export type TRequestParams = {
    url?: string;
    viewItemId: string | undefined;
    viewPageId: string | undefined;
    viewPageArgs: string | undefined;
    interval?: number;
    mockData?: any;
};

const EVENT_SOURCE = 'request-data-list-helper';

const dispatch = (context: any, type: string, data: any) => {
    context.trigger(type, EVENT_SOURCE, data);
};

const nextTick = (resolve) => Promise.resolve().then(resolve);

const defaultOption: THelpserOption = {
    loggerPrefix: '[RequestDataListHelper]',
    silentUpdate: true,

    verifyRequestParams: () => true,

    interval: timerInterval.minute * 15,
    onIntervalData: _.noop,
};

/**
 * RequestDataHelper
 */
class RequestDataHelper extends EventClass {
    /**
     * constructor
     * @param {Object} context
     * @param {String} option.loggerPrefix
     * @param {Function} option.verifyRequestParams
     * @param {Number} option.interval
     * @param {Function} option.onIntervalData
     */
    constructor(context: any, option: THelpserOption) {
        super();
        this.context = context;
        this.option = {
            ...defaultOption,
            ...(option || {}),
        };
        this.requestData = this.requestData.bind(this);
    }

    // @ts-ignore
    private context: any;
    private option: THelpserOption | any;
    _destroyed = false;
    _requestCount = 0;
    _timer: any = null;
    _preRequestDataListParams: any = undefined;

    // @ts-ignore
    _requestApi = (url: any, viewItemId: any, viewPageId: any, viewPageArgs: any, cbCb?, errorCb?) => Promise.resolve({});

    set requestApi(api) {
        if (_.isFunction(api)) {
            this._requestApi = api;
        }
    }

    get timer() {
        return this._timer;
    }

    _dataStatus = Enums.dataStatusTypes.loading;
    get dataStatus() {
        return this._dataStatus;
    }

    transformResponse = (res) => {
        const dimessions = _.get(res, 'data.viewItemData.header.dimFieldList', []);
        const indicatorList = _.get(res, 'data.viewItemData.header.counterFieldList', []);
        const rows = _.get(res, 'data.viewItemData.rows', []);
        const dataStatus = rows.length > 0 ? Enums.dataStatusTypes.success : Enums.dataStatusTypes.empty;
        this._dataStatus = dataStatus;
        return {
            response: {
                header: { dimessions, indicatorList },
                rows,
            },
            res,
            dataStatus,
        };
    };

    updateIntervalData = (result) => {
        if (this._destroyed) return;
        dispatch(this, 'data', result);
        if (_.isFunction(this.option.onIntervalData)) {
            this.option.onIntervalData(result);
        }
    };

    /**
     * requestData
     * @param {String} params.viewItemId
     * @param {String} params.viewPageId
     * @param {Object} params.viewPageArgs
     * @param {any} params.mockData
     * @returns {Promise}
     */
    requestData(params: TRequestParams) {
        const { url, viewItemId, viewPageId, viewPageArgs, mockData } = params;

        return new Promise((resolve, reject) => {
            const requestCount = (this._requestCount = this._requestCount + 1);
            this._dataStatus = Enums.dataStatusTypes.loading;
            if (mockData) {
                nextTick(() => {
                    if (this._destroyed || this._requestCount !== requestCount) return;
                    resolve(Promise.resolve(mockData).then(this.transformResponse));
                });
                return;
            }

            if (!this.option.verifyRequestParams({ viewItemId, viewPageId, viewPageArgs })) {
                resolve({
                    dataStatus: Enums.dataStatusTypes.empty,
                });
                return;
            }

            // @ts-ignore
            logger.default.debug({
                desc: `${this.option.loggerPrefix || ''}请求参数`,
                viewItemId,
                viewPageId,
                viewPageArgs,
            });

            this._requestApi(
                url,
                viewItemId,
                viewPageId,
                viewPageArgs,
                (res: any) => {
                    if (this._destroyed || this._requestCount !== requestCount) return;
                    // @ts-ignore
                    logger.default.debug({
                        desc: `${this.option.loggerPrefix || ''}请求响应`,
                        viewItemId,
                        viewPageId,
                        viewPageArgs,
                        res,
                    });
                    resolve(this.transformResponse(res));
                },
                (error: any) => {
                    if (this._destroyed || this._requestCount !== requestCount) return;
                    reject({
                        dataStatus: Enums.dataStatusTypes.error,
                        error,
                    });
                },
            );
        });
    }

    requestDataListInterval(params: TRequestParams, transformParams = () => ({})) {
        const { interval, ...restParams } = params || {};
        if (interval && interval !== this.option.interval) {
            this.option.interval = interval;
        }
        const requestCallback = () => {
            const transformedParams = transformParams();
            const requestDataListParams = {
                ...restParams,
                ...transformedParams,
            };

            // 参数不同才会重新loading，参数相同就静默刷数据，不出现loading
            if (!_.isEqual(requestDataListParams, this._preRequestDataListParams) || !this.option.silentUpdate) {
                this._preRequestDataListParams = requestDataListParams;
                this.updateIntervalData({
                    dataStatus: Enums.dataStatusTypes.loading,
                });
            }

            const request = this.requestData(requestDataListParams);
            request
                .then((result) => {
                    this.updateIntervalData(result);
                })
                .catch((errorResult) => {
                    // @ts-ignore
                    logger.default.error({
                        desc: `${this.option.loggerPrefix || ''}请求异常`,
                        errorResult,
                    });
                    this.updateIntervalData({
                        ...errorResult,
                        dataStatus: Enums.dataStatusTypes.error,
                    });
                });
        };
        this._timer?.clear();
        this._timer = initTimer(requestCallback, this.option.interval || timerInterval.minute * 5);
        this._timer.start();
    }

    destroy() {
        this._destroyed = true;
        this._timer?.clear();
        this._timer = null;
        this.off('data', EVENT_SOURCE, undefined);
    }
}

export default RequestDataHelper;
