import React from 'react';
import { _ } from 'oss-web-toolkits';
import { headersMap } from '../../../maps';
import './index.less';

const Index = (props) => {
    const { children, header = {}, className = '', ...styleProps } = props;

    const HeaderComponent = !_.isEmpty(header) && header.name ? headersMap.get(header.name).component : React.Fragment;

    return (
        <div className={`default-container-wrapper ${className}`} style={styleProps}>
            <div className="header-wrapper">{<HeaderComponent {...header.config} />}</div>
            <div className="container-body-wrapper">{children}</div>
        </div>
    );
};

export default Index;
