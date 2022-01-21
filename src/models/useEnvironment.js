import { createModel } from 'hox';
import { useEnvironment } from 'oss-web-common';
import constants from '@Common/constants';

const isUseSeverConfig = constants.CONFIG_LOCAL !== 'true';

const settingPath = isUseSeverConfig
    ? `${constants.CONFIG_HOST}/configmanage/environment.json?isApply=true&projectName=oss-scene-monitor`
    : `${constants.MICRO_APP_URL}/environment.json`;
    
export default createModel(useEnvironment, {
    configPath: settingPath
});
