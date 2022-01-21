import { createGlobalStyle } from 'styled-components';
import constants from '../../common/constants';

// 全局的字体
export const GLOBAL_FONTS = [
    // 系统字体
    { key: 'Microsoft YaHei', name: '微软雅黑' },
    { key: 'SimSun', name: '宋体' },
    { key: 'SimHei', name: '黑体' },
    { key: 'Source Han Sans CN', name: '思源黑体' },
    { key: 'DIN', name: 'DIN' },
    { key: 'Verdana', name: 'Verdana' },

    // 自定义字体
    { key: 'TRENDS', name: 'TRENDS' },
    { key: 'DIGIFACEWIDE', name: 'DIGIFACEWIDE' },
    { key: 'AGENCYB', name: 'AGENCYB' },
    { key: 'AGENCYR', name: 'AGENCYR' },
    { key: 'PixelLCD-7', name: 'Pixel LCD-7' },
    { key: 'FZZYJW--GB1-0', name: '方正综艺简体' },
    { key: 'AdobeHeitiStdR', name: 'Adobe 黑体 Std R' },
    { key: 'ShiShangZhongHeiJianTi', name: '时尚中黑简体' },
    { key: 'FZZongYi-M05S', name: '方正综艺' },
    { key: 'SourceHanSansCN', name: '思源黑体-Medium' },
    { key: 'PangMenZhengDao', name: '庞门正道' },
];

// @ts-ignore
const GlobalFonts = createGlobalStyle`
    @font-face {
        font-family: 'TRENDS';
        src: url(${constants.STATIC_PATH}/fonts/TRENDS.TTF);
    }
    @font-face {
        font-family: 'DIGIFACEWIDE';
        src: url(${constants.STATIC_PATH}/fonts/DIGIFACEWIDE.TTF);
    }
    @font-face {
        font-family: 'AGENCYB';
        src: url(${constants.STATIC_PATH}/fonts/AGENCYB.TTF);
    }
    @font-face {
        font-family: 'AGENCYR';
        src: url(${constants.STATIC_PATH}/fonts/AGENCYR.TTF);
    }
    @font-face {
        font-family: 'PixelLCD-7';
        src: url(${constants.STATIC_PATH}/fonts/Pixel-LCD-7-1.TTF);
    }
    @font-face {
        font-family: 'FZZYJW--GB1-0';
        src: url(${constants.STATIC_PATH}/fonts/FZZYJW--GB1-0.TTF);
    }
    @font-face {
        font-family: 'AdobeHeitiStdR';
        src: url(${constants.STATIC_PATH}/fonts/AdobeHeitiStd-Regular.otf);
    }
    @font-face {
        font-family: 'ShiShangZhongHeiJianTi';
        src: url(${constants.STATIC_PATH}/fonts/ShiShangZhongHeiJianTi.ttF);
    }
    @font-face {
        font-family: 'FZZongYi-M05S';
        src: url(${constants.STATIC_PATH}/fonts/FangZhengZongYi.TTF);
    }
    @font-face {
        font-family: 'SourceHanSansCN';
        src: url(${constants.STATIC_PATH}/fonts/SourceHanSansCN-Medium.otf);
    }
    @font-face {
        font-family: 'PangMenZhengDao';
        src: url(${constants.STATIC_PATH}/fonts/PangMenZhengDao.ttf);
    }
`;

export default GlobalFonts;
