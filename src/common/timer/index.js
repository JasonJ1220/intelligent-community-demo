/**
 * 统一的定时器初始化类
 */
class Timer {
    _status;
    _callback;
    _interval;
    _timerId;
    _manualPauseFlag;

    constructor(callback, interval = 1000, needPreExecute = true) {
        // 不支持 `alert('Hello World')` 类似的计算表达式
        if (!callback || typeof callback !== 'function') {
            throw new TypeError('无效的定时器任务，请传入合法的回调函数');
        }

        this._status = 'pending';
        this._callback = callback;
        this._interval = interval;
        this._timerId = undefined;
        this._manualPauseFlag = false;
        this._needPreExecute = needPreExecute;

        this.visibilityChange = this.visibilityChange.bind(this);

        // this.start();
    }

    start() {
        if (!this._timerId) {
            if (this._needPreExecute) {
                this._callback();
            }
            // console.log('定时器开始执行');
            this._timerId = setInterval(this._callback, this._interval);

            this._status = 'running';
            this._manualPauseFlag = false;

            document.addEventListener('visibilitychange', this.visibilityChange);
        } else {
            console.warn('当前已有正在运行的定时器任务');
        }
    }

    restart() {
        if (!this._timerId) {
            if (this._needPreExecute) {
                this._callback();
            }
            // console.log('定时器重启执行');
            this._timerId = setInterval(this._callback, this._interval);

            this._status = 'running';
            this._manualPauseFlag = false;

            document.addEventListener('visibilitychange', this.visibilityChange);
        } else {
            console.warn('当前已有正在运行的定时器任务');
        }
    }

    pause(manualPauseFlag = true) {
        if (this._timerId) {
            // console.log('定时器暂停执行');
            clearInterval(this._timerId);

            this._status = 'suspending';

            // 暂停是否由页面组件发起，默认为true
            // 如果是由页面是否可见监听器触发的则为false，防止如果手动已暂停，但是切换了页面显示/隐藏自动开启了定时器
            this._manualPauseFlag = manualPauseFlag;

            this._timerId = null;
        } else {
            console.warn('当前定时器任务已暂停');
        }
    }

    clear() {
        if (this._timerId) {
            // console.log('清除定时器');
            clearInterval(this._timerId);
            this._status = 'pending';

            document.removeEventListener('visibilitychange', this.visibilityChange);

            this._callback = undefined;
            this._interval = undefined;
            this._timerId = null;
            this._manualPauseFlag = false;
        } else {
            console.warn('当前没有正在运行的定时器任务');
        }
    }

    // 定时器是否正在运行
    getStatus() {
        return this._status === 'running';
    }

    visibilityChange() {
        // console.log(document.visibilityState);

        // 当定时器id为null的时候 visibility事件不执行
        if (this._timerId === null) return;

        if (document.visibilityState === 'hidden' && this._status === 'running') {
            this.pause(false);
        } else if (document.visibilityState === 'visible' && !this._manualPauseFlag) {
            this.restart();
        }
    }
}

/***** 时间段 常量 start *****/
const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;

const interval = {
    second,
    minute,
    hour,
};
/***** 时间段 常量 end *****/

export default function initTimer(callback, interval = second, needPreExecute, fn) {
    fn && fn();
    return new Timer(callback, interval, needPreExecute);
}

export { interval };
