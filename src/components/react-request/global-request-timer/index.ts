// @ts-ignore
import initTimer from '@Common/timer';
import { ITimerTask, ICallback, ITimer, GlobalTimerAbstract } from './index.type';

const GLOBAL_TIMER_MAP = new Map();
const GLOBAL_TIMER_TASK_MAP = new Map();

const SYMBOL_TASK = Symbol('SYMBOL_CALLBACK');

/**
 * creatTimerTask
 * @param task
 * @param timer
 * @returns
 */
const creatTimerTask = (task: ITimerTask, timer: ITimer, key) => {
    const start = () => {
        if (task.destroyed) return;
        task.isPause = false;
        if (!timer?.getStatus()) {
            timer.start();
        }
    };

    // 保持与initTimer一样的api
    return {
        [SYMBOL_TASK]: task,
        start,
        restart() {
            start();
        },
        getStatus() {
            return !task.isPause;
        },
        pause(force = false) {
            if (task.destroyed) return;
            task.isPause = true;
            if (force) timer?.pause();
        },
        clear() {
            if (task.destroyed) return;
            task.destroyed = true;
            let tasks = GLOBAL_TIMER_TASK_MAP.get(key);
            tasks.delete(task);
            task.callback = null;
        },
    };
};

/**
 * 根据interval参数全局有限度的创建定时器??
 * 这不是就是相当于并发了~~~~~
 * 测试100个任务的时候，页面已经卡废了
 * 所以 轮询实时数据，怎么能让前端搞呢 ，😔
 */
class GlobalRequestTimer extends GlobalTimerAbstract {
    constructor() {
        super();

        this.initTimer = this.initTimer.bind(this);
        this.start = this.start.bind(this);
        this.restart = this.restart.bind(this);
        this.pause = this.pause.bind(this);
        this.clear = this.clear.bind(this);
    }

    initTimer(callback: ICallback, interval: number, execFlag: boolean) {
        const key = `interval_${interval}_flag_${execFlag}`;
        let timer = GLOBAL_TIMER_MAP.get(key);

        if (!timer) {
            timer = initTimer(
                () => {
                    if (!timer || timer.destroyed) return;
                    const callbacks = GLOBAL_TIMER_TASK_MAP.get(key);
                    callbacks.forEach((task: any) => {
                        const c = task[SYMBOL_TASK];
                        if (!c || c.destroyed) return;
                        if (!c.isPause && c.callback) {
                            c.callback();
                        }
                    });
                },
                interval,
                execFlag
            );
            timer.destroyed = false;
            GLOBAL_TIMER_MAP.set(key, timer);
        }

        // 任务被替换了
        let tasks = GLOBAL_TIMER_TASK_MAP.get(key);
        if (!tasks) {
            tasks = new Set();
            GLOBAL_TIMER_TASK_MAP.set(key, tasks);
        }
        const timerTask = creatTimerTask({ isPause: false, destroyed: false, callback }, timer, key);
        tasks.add(timerTask);
        return timerTask;
    }

    start() {
        // 这个似乎不会启动定时器 /(ㄒoㄒ)/~~
        // 还是要依赖task的start
        if (GLOBAL_TIMER_MAP.size > 0) {
            GLOBAL_TIMER_MAP.forEach((timer) => {
                if (!timer.getStatus()) {
                    timer.start();
                }
            });
        }
    }

    restart() {
        this.start();
    }

    pause(key: string) {
        const timer = GLOBAL_TIMER_MAP.get(key);
        if (timer) {
            timer.pause();
        }
    }

    clear() {
        if (GLOBAL_TIMER_MAP.size > 0) {
            GLOBAL_TIMER_MAP.forEach((timer) => {
                timer.clear();
                timer.destroyed = true;
                timer = null;
            });
            GLOBAL_TIMER_MAP.clear();
        }

        if (GLOBAL_TIMER_TASK_MAP.size > 0) {
            GLOBAL_TIMER_TASK_MAP.forEach((tasks) => {
                tasks.forEach((t: any) => t.clear());
                tasks.clear();
            });
            GLOBAL_TIMER_TASK_MAP.clear();
        }
    }
}

export default new GlobalRequestTimer();
