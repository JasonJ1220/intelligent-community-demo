import React, { useEffect } from 'react';
import { Layout, ConfigProvider, Icon } from 'oss-ui';
import { ErrorBoundary, router } from 'oss-web-common';
import useEnvironment from './models/useEnvironment';
import routes from './routes';
import { useHistory } from 'react-router';
import { logger } from 'oss-web-toolkits';
import { AliveScope } from 'react-activation';
import GlobalFonts from './components/global-fonts';
import './styles/App.less';
const { Content } = Layout;

if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_MOCK === 'true') {
    require('./mock');
}
const customizeRenderEmpty = () => (
    //这里面就是我们自己定义的空状态
    <div className="intelli-comminity-demo-empty">
        <Icon type="iconzanwushuju" style={{ fontSize: 60, marginBottom: 5, color: '#006AD5' }} />
        <p style={{ color: '#006AD5', fontSize: 18 }}>暂无数据</p>
    </div>
);
const { mapRoutes, Switch } = router;

function IntelliCommunity(props) {
    const { curRoute } = props;

    const { environmentLoaded, environment } = useEnvironment();
    const history = useHistory();

    useEffect(() => {
        if (curRoute) {
            history.push(curRoute);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (environmentLoaded) {
            // Trace = 0,
            // Debug = 1,
            // Info = 2,
            // Warning = 3,
            // Error = 4
            logger.default.level = environment?.loggerLevel;
        }
    }, [environmentLoaded, environment]);

    return (
        <ConfigProvider prefixCls="oss-ui" renderEmpty={customizeRenderEmpty}>
            <Layout className="intelligent-community">
                <GlobalFonts />
                <Content className="content">
                    <ErrorBoundary>
                        {environmentLoaded && (
                            <Switch>
                                <AliveScope>{mapRoutes(routes)}</AliveScope>
                            </Switch>
                        )}
                    </ErrorBoundary>
                </Content>
            </Layout>
        </ConfigProvider>
    );
}

export default IntelliCommunity;
