import React, { PureComponent } from 'react';
import { attachModel, constantsMap } from '../../model';

import './index.less';

/**
 * 左屏少数民族top
 */
class Index extends PureComponent {
    render() {
        return <div className="intelligent-comminity-right-page-early-warn-count-wrapper">右屏预警数量</div>;
    }
}

export default attachModel({}, {})(Index);
