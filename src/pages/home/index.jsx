import React from 'react';
import CommonDetail from '@Components/common-detail-component';
import BackgroundImage from './images/bg_screen.jpg';
import layoutConfig from './layout-config.json';
import { componentsMap } from './components';
import { store } from './model';

function Index({ history }) {
    return (
        <CommonDetail
            topGridLayoutElementId="intelli-community-detail-top-layout"
            style={{
                backgroundColor: '#020629',
                backgroundImage: `url(${BackgroundImage})`,
            }}
            layoutConfig={layoutConfig}
            componentsMap={componentsMap}
            history={history}
            store={store}
            canBeControlled={false}
        />
    );
}

export default Index;
