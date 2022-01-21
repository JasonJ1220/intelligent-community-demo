```jsx
import initTimer from '@Common/timer';
import { Button } from 'oss-ui';

class Index extends React.PureComponent {
    constructor(props) {
        super(props);

        //始化化定时器挂载在this上 注意 定时器回调需要需要bind当前实例或者用箭头函数来定义回调函数
        this.timer1 = initTimer(this.timerCb.bind(this), 1000);
    }

    // 开始执行
    componentDidMount() {
        this.timer1.start();
    }

    //定时器回调
    timerCb = () => {}

    //暂停执行
    func1 = () => {
        this.timer1.pause();
    };

    //重新执行
    func2 = () => {
        this.timer1.restart();
    };

    // 清除计时器
    componentWillUnmount() {
        this.timer1.clear();
    }

    render() {
        return <div>
            <Button onClick={this.func1}>暂停执行定时器</Button>
            <Button onClick={this.func2}>重启执行定时器</Button>
        </div>
    }
}
```