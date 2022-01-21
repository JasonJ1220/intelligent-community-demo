import { Enums } from 'oss-web-common';

// 全场景-左右屏-指标类型枚举
const sidePartIndicatorTypes = [
    { id: 0, key: 'user_count', name: () => '用户数' },
    { id: 1, key: 'flow', name: () => '流量' },
    { id: 2, key: 'traffic', name: () => '话务量' },
];

// 全场馆-地图类型
const compMiddlePathMapTypes = [
    { id: '0', key: 'stadiums', name: () => '场馆赛事' },
    { id: '1', key: 'businessScale', name: () => '业务量' },
    { id: '2', key: 'faultCount', name: () => '故障统计' },
    { id: '3', key: 'emergencyResource', name: () => '应急资源' },
];

// 场景objectId
const sceneObjectIdTypes = [
    { id: '901', key: 'subway', name: () => '地铁' },
    { id: '902', key: 'railway', name: () => '高铁' },
    { id: '903', key: 'highway', name: () => '高速' },
    { id: '904', key: 'torch', name: () => '火炬' },
    { id: '905', key: 'scenicSpot', name: () => '景区' },
    { id: '906', key: 'hotel', name: () => '酒店' },
    { id: '907', key: 'stadiums', name: () => '场馆' },
    { id: '908', key: 'airport', name: () => '机场' },
    { id: '909', key: 'allScene', name: () => '全场景' },
    { id: 'cloudNetwork', key: 'cloudNetwork', name: () => '云网' },
    { id: '8218080778137423513', key: 'airport_xianyan', name: () => '西安咸阳国际机场' },

    // 场馆:主场馆、单场馆
    { id: '907-single', key: 'singleStadiums', name: () => '单场馆' },
    { id: '907-main', key: 'mainStadiums', name: () => '主场馆' },
];

// 省份
const provinceIdTypes = [{ id: '1161128211', key: 'province', name: () => '陕西省' }];

//#region comp-stadium-path-map-part 场馆path地图附件
// 移动网络分类 id 是后端给的，但是需要前端去组合
const mobileNetworkCategoryTypes = [
    { name: () => '5G', key: 'key5g', id: '5g', label: '5G' },
    { name: () => '4G', key: 'key4g', id: '4g', label: '4G' },
    { name: () => '2G', key: 'key2g', id: '2g', label: '2G' },
];

// 故障统计位置 id是后端给的，但是需要前端去组合
const faultCountPositionTypes = [
    { name: () => '基站', key: 'base', id: 'base', label: '基站' },
    { name: () => '小区', key: 'cell', id: 'cell', label: '小区' },
    { name: () => 'AP', key: 'ap', id: 'ap', label: 'AP' },
    { name: () => '专线', key: 'special', id: 'special', label: '专线' },
];

// 业务量统计分类
export const businessScaleCountTypes = [
    { name: () => '4G在线用户数', id: '4G_online_users', key: 'user4g', value: '4G', unit: '个' },
    { name: () => '5G在线用户数', id: '5G_online_users', key: 'user5g', value: '5G', unit: '个' },
    { name: () => '总话务量', id: 'total_Erl', key: 'totalTraffic', value: '2G\nVoLte', unit: 'Erl' },
    { name: () => '总流量', id: 'total_flow', key: 'totalFlow', value: '4G+5G', unit: 'GB' },
];

// 比赛状态
export const competitionStatus = [
    { name: () => '未开始', id: '0', key: 'not_start' },
    { name: () => '进行中', id: '1', key: 'starting' },
    { name: () => '已结束', id: '2', key: 'end' },
];
// 比赛类型
const competitionType = [
    { id: '1', key: '1', name: () => '山地自行车', icon: 'iconzihangche-4' },
    { id: '2', key: '2', name: () => '击剑', icon: 'iconjijian' },
    { id: '3', key: '3', name: () => '射箭', icon: 'iconshejian' },
    { id: '4', key: '4', name: () => '马术', icon: 'iconmashu' },
    { id: '5', key: '5', name: () => '小轮车', icon: 'iconxiaolunche' },
    { id: '6', key: '6', name: () => '自行车公路赛', icon: 'iconzixingche1' },
    { id: '7', key: '7', name: () => '马拉松游泳', icon: 'iconyouyong-6' },
    { id: '8', key: '8', name: () => '铁人三项', icon: 'icontierensanxiang' },
    { id: '9', key: '9', name: () => '沙滩排球', icon: 'iconshatanpaiqiu' },
    { id: '10', key: '10', name: () => '马拉松', icon: 'iconmalasong' },
    { id: '11', key: '11', name: () => '水球', icon: 'iconshuiqiu' },
    { id: '12', key: '12', name: () => '高尔夫', icon: 'icongaoerfu' },
    { id: '13', key: '13', name: () => '赛艇', icon: 'iconsaiting' },
    { id: '14', key: '14', name: () => '皮划艇', icon: 'iconpihuating' },
    { id: '15', key: '15', name: () => '现代五项', icon: 'iconxiandaiwuxiang' },
    { id: '16', key: '16', name: () => '网球', icon: 'iconwangqiu' },
    { id: '17', key: '17', name: () => '散打', icon: 'iconsanda' },
    { id: '18', key: '18', name: () => '拳击', icon: 'iconquanji-' },
    { id: '19', key: '19', name: () => '乒乓球', icon: 'iconpingpangqiu' },
    { id: '20', key: '20', name: () => '曲棍球', icon: 'iconqugunqiu1' },
    { id: '21', key: '21', name: () => '摔跤', icon: 'iconshuaijiao1' },
    { id: '22', key: '22', name: () => '武术', icon: 'iconwushu' },
    { id: '23', key: '23', name: () => '配套设施', icon: 'iconsheshi' },
    { id: '24', key: '24', name: () => '攀岩', icon: 'iconpanyan1' },
    { id: '25', key: '25', name: () => '花式游泳', icon: 'iconhuashiyouyong' },
    { id: '26', key: '26', name: () => '田径', icon: 'icontianjing' },
    { id: '27', key: '27', name: () => '跳水', icon: 'icondiving' },
    { id: '28', key: '28', name: () => '游泳', icon: 'iconyouyong-5' },
    { id: '29', key: '29', name: () => '开幕式', icon: 'iconkaimu' },
    { id: '30', key: '30', name: () => '闭幕式', icon: 'iconbimu' },
    { id: '31', key: '31', name: () => '滑板', icon: 'iconhuaban-3' },
    { id: '32', key: '32', name: () => '蹦床', icon: 'iconbengchuang' },
    { id: '33', key: '33', name: () => '篮球', icon: 'iconlanqiu1' },
    { id: '34', key: '34', name: () => '体操', icon: 'iconlaladui' },
    { id: '35', key: '35', name: () => '柔道', icon: 'iconroudao' },
    { id: '36', key: '36', name: () => '空手道', icon: 'iconicon_taiquandao1' },
    { id: '37', key: '37', name: () => '跆拳道', icon: 'iconicon_taiquandao' },
    { id: '38', key: '38', name: () => '橄榄球', icon: 'iconganlanqiu' },
    { id: '39', key: '39', name: () => '垒球', icon: 'iconleiqiu' },
    { id: '40', key: '40', name: () => '棒球', icon: 'iconbangqiu' },
    { id: '41', key: '41', name: () => '射击', icon: 'iconsheji' },
    { id: '42', key: '42', name: () => '手球', icon: 'iconshouqiu' },
    { id: '43', key: '43', name: () => '举重', icon: 'iconjuzhong' },
    { id: '44', key: '44', name: () => '排球', icon: 'iconpaiqiu' },
    { id: '45', key: '45', name: () => '羽毛球', icon: 'iconyumaoqiu' },
    { id: '46', key: '46', name: () => '足球', icon: 'iconzuqiu' },
];

// 天气类型
const weatherType = [
    { id: '1000', key: '1000', name: () => '晴（白天）', icon: 'iconsunny-copy' },
    { id: '1001', key: '1001', name: () => '晴（夜晚）', icon: 'iconsunny-night1' },
    { id: '1002', key: '1002', name: () => '多云（白天）', icon: 'iconcloudy-sunny1' },
    { id: '1003', key: '1003', name: () => '多云（夜晚）', icon: 'icon1' },
    { id: '1004', key: '1004', name: () => '阴', icon: 'iconcloudy1' },
    { id: '1005', key: '1005', name: () => '轻雾', icon: 'iconhaze1' },
    { id: '1006', key: '1006', name: () => '浓雾', icon: 'iconnongwu' },
    { id: '1007', key: '1007', name: () => '雾', icon: 'iconwu' },
    { id: '1008', key: '1008', name: () => '霾', icon: 'iconwu' },
    { id: '1009', key: '1009', name: () => '小雨', icon: 'iconrain-light1' },
    { id: '1010', key: '1010', name: () => '小雨-中雨', icon: 'iconrain1' },
    { id: '1011', key: '1011', name: () => '中雨', icon: 'iconrain-heavy1' },
    { id: '1012', key: '1012', name: () => '中雨-大雨', icon: 'iconrain-storm1' },
    { id: '1013', key: '1013', name: () => '大雨', icon: 'iconrain-storm1' },
    { id: '1014', key: '1014', name: () => '大雨-暴雨', icon: 'iconrain-storm1' },
    { id: '1015', key: '1015', name: () => '暴雨', icon: 'iconrain-storm1' },
    { id: '1016', key: '1016', name: () => '特大暴雨', icon: 'iconrain-storm1' },
    { id: '1017', key: '1017', name: () => '冻雨', icon: 'icondongyu' },
    { id: '1018', key: '1018', name: () => '阵雨', icon: 'iconthund-shower-hail1' },
    { id: '1019', key: '1019', name: () => '雷阵雨', icon: 'iconthunder-shower1' },
    { id: '1020', key: '1020', name: () => '雷电', icon: 'iconleidian' },
    { id: '1021', key: '1021', name: () => '冰雹', icon: 'iconbingbao' },
    { id: '1023', key: '1023', name: () => '雨夹雪', icon: 'iconsleet1' },
    { id: '1024', key: '1024', name: () => '小雪', icon: 'iconsnow-light1' },
    { id: '1025', key: '1025', name: () => '中雪', icon: 'iconsnow1' },
    { id: '1026', key: '1026', name: () => '大雪', icon: 'iconsnow-heavy1' },
    { id: '1027', key: '1027', name: () => '暴雪', icon: 'iconsnow-heavy1' },
    { id: '1028', key: '1028', name: () => '大-暴雪', icon: 'iconsnow-heavy1' },
    { id: '1029', key: '1029', name: () => '霜冻', icon: 'iconshuangdong' },
    { id: '1030', key: '1030', name: () => '台风', icon: 'icontaifeng' },
    { id: '1031', key: '1031', name: () => '浮尘', icon: 'icondust1' },
    { id: '1032', key: '1032', name: () => '扬沙', icon: 'iconfog1' },
    { id: '1033', key: '1033', name: () => '沙尘暴', icon: 'iconsandstorm1' },
    { id: '1034', key: '1034', name: () => '强沙尘暴', icon: 'iconqiangshachenbao' },
];

// 场馆主场馆、闭幕式场馆
const stadiumTypes = [
    { id: '7325724412243573355', key: 'mainStadium', name: () => '西安奥体中心体育场' },
    { id: '7213134421559310955', key: 'closingStadium', name: () => '西安奥体中心体育馆' },
];

// 网元类型
const networkElementTypes = [
    { id: 201, key: 'site2g', type: '2G' },
    { id: 300, key: 'cell2g', type: '2G' },

    { id: 9201, key: 'site3g', type: '3G' },
    { id: 9300, key: 'cell3g', type: '3G' },

    { id: 8104, key: 'site4g', type: '4G' },
    { id: 8105, key: 'cell4g', type: '4G' },

    { id: 3201, key: 'site5g', type: '5G' },
    { id: 3300, key: 'cell5g', type: '5G' },
];

// 数据状态的枚举
// 这块其实应该是从组件中导入就行,没必要在项目中声明
// import {DataStatus} from 'oss-ui'
// DataStatus.STATUS.LOADING DataStatus.STATUS.ERROR, ...
const dataStatusTypes = [
    { id: 'loading', key: 'loading' },
    { id: 'error', key: 'error' },
    { id: 'empty', key: 'empty' },
    { id: 'success', key: 'success' },
];
// 场馆-视图服务-场景级别类型枚举
const stadiumViewSceneLevel = [
    { id: 1, key: 'AllStadium', name: () => '全场馆' },
    { id: 3, key: 'SingleStadium', name: () => '单场馆' },
    { id: 4, key: 'Area', name: () => '区域' },
];

const shaanxiEnums = {
    sidePartIndicatorTypes,
    compMiddlePathMapTypes,
    sceneObjectIdTypes,
    provinceIdTypes,
    mobileNetworkCategoryTypes,
    faultCountPositionTypes,
    businessScaleCountTypes,
    competitionType,
    weatherType,
    stadiumTypes,
    competitionStatus,
    networkElementTypes,
    dataStatusTypes,
    stadiumViewSceneLevel,
};

const { rebuild: rebuildEnums } = Enums;
rebuildEnums.call(shaanxiEnums);

export default shaanxiEnums;
