import React, { PureComponent } from 'react';
import { attachModel, constantsMap } from '../model';
import './index.less';

/**
 * 智慧社区中屏
 */
class Index extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    componentDidUpdate(prevProps, prevState) {}

    componentWillUnmount() {}

    render() {
        return <div className="intelligent-comminity-middle-page-wrapper">中屏区域</div>;
    }
}

export default attachModel({}, {})(Index);
