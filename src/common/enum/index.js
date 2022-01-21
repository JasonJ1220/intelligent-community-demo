import { Enums } from 'oss-web-common';
import common from './common.js';

const { rebuild: rebuildEnums } = Enums;

let enumsContainer = Object.assign({}, common);
rebuildEnums.call(enumsContainer);

export default enumsContainer;
