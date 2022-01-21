import { getMicroUrl } from 'oss-web-common';
const { REACT_APP_CONFIG_HOST, REACT_APP_CONFIG_LOCAL, NODE_ENV } = process.env;

const isEnvProduction = NODE_ENV === 'production';
const isMicroApp = window.__INJECT_BY_SINGLE_SPA__;
const BASE_NAME = '/intelli-commmunity';
// const BASE_NAME = isMicroApp ? '/scene' : '';
const MICRO_APP_URL = isMicroApp && isEnvProduction ? getMicroUrl(window) + BASE_NAME : getMicroUrl(window);

// const MICRO_APP_URL = getMicroUrl();
const STATIC_PATH = `${MICRO_APP_URL}/static`;
const IMAGE_PATH = `${STATIC_PATH}/images`;
const LOCALES_PATH = `${STATIC_PATH}/locales`;

const constants = {
    BASE_NAME: BASE_NAME,
    STATIC_PATH,
    IMAGE_PATH,
    LOCALES_PATH,
    MICRO_APP_URL,
    CONFIG_HOST: REACT_APP_CONFIG_HOST || '',
    CONFIG_LOCAL: REACT_APP_CONFIG_LOCAL,
};
export default constants;
