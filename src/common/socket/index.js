import { _ } from 'oss-web-toolkits';
/**
 * 统一的socket接口连接和通信类
 * 每个大屏页面需要new该类后，需要和页面的store绑定。
 * 收到的信息中包括store中的key和修改后的值 通过 `store.dispatch`通知页面
 */

function testEventName(name) {
    const reg = /^open$|^close$|^message$|^error$/;
    return reg.test(name);
}

class WSocket {
    constructor(options) {
        this.socketInstance = null;
        this.eventArray = [];
    }
    // ws代码
    initSocketInstance(url, onOpen, onMessage, onError, onClose) {
        if (!('WebSocket' in window)) {
            throw new Error('Websocket is not supported in your browser');
        }
        if (url && typeof url === 'string') {
            const socket = new WebSocket(url);
            this.socketInstance = socket;
            this.addEventForSocketInstance('open', () => {
                if (typeof onOpen === 'function') {
                    onOpen();
                }
            });
            this.addEventForSocketInstance('message', (event) => {
                if (typeof onMessage === 'function') {
                    this.receiveMessage(event, onMessage);
                }
            });

            this.addEventForSocketInstance('close', (event) => {
                if (typeof onClose === 'function') {
                    this.receiveMessage(event, onClose);
                }
            });

            this.addEventForSocketInstance('error', (event) => {
                if (typeof onError === 'function') {
                    this.receiveMessage(event, onError);
                }
            });
        }
    }
    addEventForSocketInstance(eventName, callback) {
        const socket = this.socketInstance;
        const { eventArray } = this;
        if (socket && testEventName(eventName)) {
            socket.addEventListener(eventName, callback);
            this.eventArray = [...eventArray, { eventName, callback }];
        }
    }
    removeEventForSocketInstance(eventName) {
        const socket = this.socketInstance;
        const { eventArray } = this;
        if (socket && eventArray.length) {
            const eventArrayWaitRemove = eventArray.filter((item) => item.eventName === eventName);
            if (eventArrayWaitRemove.length) {
                eventArrayWaitRemove.forEach((eventItem) => {
                    socket.removeEventListener(eventItem.eventName, eventItem.callback);
                });
            }
            this.eventArray = eventArray.filter((item) => item.eventName !== eventName);
        }
    }
    closeSocket() {
        const { eventArray } = this;
        const socket = this.socketInstance;
        if (eventArray.length) {
            eventArray.forEach((eventItem) => {
                if (eventItem.eventName !== 'close') {
                    this.removeEventForSocketInstance(eventItem.eventName);
                }
            });
        }
        if (socket && socket.close) {
            socket.close();
        }
        this.socketInstance = null;
    }
    sendMessage(msg) {
        const socket = this.socketInstance;
        if (socket && socket.readyState === WebSocket.OPEN) {
            if (typeof msg === 'string') {
                socket.send(msg);
            } else {
                socket.send(JSON.stringify(msg));
            }
        }
    }
    receiveMessage(event, onMessage) {
        onMessage(event);
        // const data = parseSocketData(event, this.pongMsg);
        // if (data !== 'error') {
        //     onMessage(data);
        // }
    }
}

export default function initSocket(url, onOpen = _.noop, onMessage = _.noop, onError = _.noop, onClose = _.noop) {
    const socket = new WSocket();

    socket.initSocketInstance(url, onOpen, onMessage);

    return socket;
}
