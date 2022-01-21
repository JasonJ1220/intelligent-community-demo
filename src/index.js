import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store';
import { LocaleProvider } from 'oss-web-common';
import constants from './common/constants';
import { Icon } from 'oss-ui';
import 'animate.css';

const BASENAME = constants.BASE_NAME;

Icon.createFromIconfontCN({
    scriptUrl: [
        // '//at.alicdn.com/t/font_2320878_b31j5ostd68.js',
    ],
    prefixCls: '', // 或者 直接调用 Icon.prefixCls = 'xxx';
    // iconFontType: 'intelli-commmunity',
});

const store = configureStore();

ReactDOM.render(
    <React.StrictMode>
        <div className="intelligent-community-demo">
            <Provider store={store}>
                <LocaleProvider localePath={constants.LOCALES_PATH}>
                    <BrowserRouter basename={BASENAME}>
                        <App />
                    </BrowserRouter>
                </LocaleProvider>
            </Provider>
        </div>
    </React.StrictMode>,
    document.querySelector('#root'),
);
