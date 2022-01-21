import React, { PureComponent } from 'react';
import { attachModel, constantsMap } from '../../model';

import './index.less';

/**
 * 左屏少数民族top
 */
class Index extends PureComponent {
    render() {
        return <div className="intelligent-comminity-left-page-rank-wrapper">左屏少数民族排行</div>;
    }
}

export default attachModel({}, {})(Index);
