import React, { PureComponent } from 'react';
import { attachModel, constantsMap } from '../../model';

import './index.less';

/**
 * 左屏人口统计
 */
class Index extends PureComponent {
    render() {
        return <div className="intelligent-comminity-left-page-population-wrapper">左屏人口统计</div>;
    }
}

export default attachModel({}, {})(Index);
