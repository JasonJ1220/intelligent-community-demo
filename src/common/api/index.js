import { createWebRequest } from 'oss-web-common';
import configs from './config';
import { _, logger } from 'oss-web-toolkits';
import useEnvironment from '@Src/models/useEnvironment';

const camelCase = (data) => {
    let updateData = [];
    if (Array.isArray(data)) {
        updateData = data.map((item) => {
            const updateItem = {};
            for (const key of Object.keys(item)) {
                updateItem[_.camelCase(key)] = item[key];
            }
            return updateItem;
        });
    }
    return updateData;
};
const responseTransforms = [
    (response) => {
        if (!response.ok) {
            if (response.status === 401) {
                const isMatchAnonyUrl = configs.anonymousUrls.reduce((result, current) => {
                    if (!result) {
                        const reg = new RegExp(current, 'g');
                        return reg.test(window.location.pathname);
                    }
                    return result;
                }, false);
                if (!isMatchAnonyUrl) {
                    // 这里要回到登录页 与 框架交互
                    // window.history.replace('/login');
                }
            } else {
                logger.default.error(response);
            }
        }
        return response;
    },
    (response) => {
        if (response.ok && response.data && /.*\/sqlm.*?apply\/execute$/.test(response.config && response.config.url)) {
            // sql下沉且包含数据
            const { data } = response.data && response.data.data;
            if (Array.isArray(data)) {
                response.data.data.data = camelCase(data);
            }
        }
        if (response.ok && response.data && /.*\/sqlm.*?apply\/executeIdList$/.test(response.config && response.config.url)) {
            // sql下沉且包含数据
            const { data } = response.data;
            if (_.isString(data) && data) {
                const dataMap = JSON.parse(data);
                // console.log(dataMap);
                for (const key in dataMap) {
                    dataMap[key].data.data = camelCase(dataMap[key].data.data);
                }
                response.data.data = dataMap;
            }
        }
        return response;
    },
];
const requestTransforms = [];
const { environment: env } = useEnvironment?.data;
const { timeout = 20000 } = env;
requestTransforms.push((res) => {
    try {
        const { url, baseUrlType = '' } = res;
        if (env && baseUrlType) {
            const {
                [baseUrlType]: { mode = '', direct: realurl = '', discover = '' },
                serviceDiscovery,
            } = env;
            if (mode === 'direct') {
                res.url = `${realurl}${url}`;
            } else if (mode === 'discover') {
                res.url = `${serviceDiscovery}/${discover}${url}`;
            }
        }
        return res;
    } catch (e) {
        return Promise.reject(e);
    }
});

const config = {
    timeout,
    contentType: 'application/json',
    withCredentials: false,
    responseTransforms,
    requestTransforms,
    baseUrl: '',
};
export default createWebRequest(config);
