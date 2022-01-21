import React, { PureComponent } from 'react';
import { attachModel, constantsMap } from '../../model';

import './index.less';

/**
 * 右屏房屋类型
 */
class Index extends PureComponent {
    render() {
        return <div className="intelligent-comminity-right-page-house-type-wrapper">右屏房屋类型</div>;
    }
}

export default attachModel({}, {})(Index);
