export interface ITimerTask {
    isPause: boolean;
    destroyed: boolean;
    callback: null | (() => void);
}

export interface ICallback {
    (): void;
}

export interface ITimer {
    getStatus(): boolean;
    start: ICallback;
    pause: ICallback;
    isPause: boolean;
}

export abstract class GlobalTimerAbstract {
    abstract initTimer(callback: ICallback, interval: number, execFlag: boolean, option?: any): any;
    abstract start(): void;
    abstract restart(): void;
    abstract clear(): void;
    abstract pause(key: string): void;
}
