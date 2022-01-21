import { Table, DataStatus } from 'oss-ui';

export interface IDataModelItem {
    dataType: string;
    fieldLabel: string;
    fieldName: string;
    fieldUnit: string;
    list: 'true' | 'false';
    rowProperties: string[];
}

// 解析后的header
export interface IParsedHeader {
    dimessions?: Array<IDataModelItem>;
    indicatorList?: Array<IDataModelItem>;
}

// 解析后的响应
export interface IParsedResponse extends IParsedHeader {
    rows?: Array<IDataModelItem>;
}

// 请求的actions
export interface IRequestActionsRef {
    current: {
        abort?: Function;
        reload?: Function;
        timer?: any; // 定时器
    };
}

// 请求使用的参数
export interface IUseViewItemDataProps {
    fullUrl?: string;
    viewItemId?: string;
    viewPageId?: string;
    viewPageArgs?: any;
    interval?: number | false;
    requestTimerPlay?: boolean;
    loggerPrefix?: '';
    loggerVisible?: boolean | undefined;
}

export interface IHocProps extends IUseViewItemDataProps {
    onRequestChange?: Function;
    dataStatusProps?: object | DataStatus;
    dataStatusVisible?: boolean;
}

// hook的返回值
export interface IUseViewItemDataResult {
    parsedResponse: IParsedResponse;
    response: any;
    requestCount: number;
    requestStatus: string | 'loading' | 'error' | 'empty' | 'success';
    actions?: {
        reload?: Function | null | undefined;
        abort?: Function;
    };
}

// dataParser
export interface ISingleValueResult {
    name?: any;
    value?: any;
    unit?: any;
    id?: any;
    __originData__?: any;
    [key: string]: any;
}

export interface IMapIndicatorListIndexToResult {
    name: number;
    value: number;
    unit: number;
    id: number;
    [key: string]: any;
}

// 高阶组件props
export interface IHocForwardCompProps extends IUseViewItemDataResult {
    isMultiSeries: boolean | undefined;
    data?: any;
    mapIndicatorListIndexToResult?: any;
    [propName: string]: any;
}

// table
export interface ITableResult {
    columns?: Table.columns;
    dataSource?: Table.dataSource;
}
