import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }
    componentDidMount() {
        document.querySelector(this.props.mountNode).appendChild(this.el);
    }

    componentWillUnmount() {
        document.querySelector(this.props.mountNode).removeChild(this.el);
    }
    // 吞掉 click 事件，让 modal 始终可见；
    // 否则 click 冒泡后，会导致 modal 消失。
    handleModalClick = (e) => {
        e.stopPropagation();
    };

    render() {
        const { style = {}, onClick, children } = this.props;
        return ReactDOM.createPortal(
            <div style={style} onClick={onClick} className="common-mask">
                {children}
            </div>,
            this.el
        );
    }
}
