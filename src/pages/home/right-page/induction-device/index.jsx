import React, { PureComponent } from 'react';
import { attachModel, constantsMap } from '../../model';

import './index.less';

/**
 * 右屏感知设备
 */
class Index extends PureComponent {
    render() {
        return <div className="intelligent-comminity-right-page-induction-device-wrapper">右屏感知设备</div>;
    }
}

export default attachModel({}, {})(Index);
