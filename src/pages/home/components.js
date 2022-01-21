import loadable from '@Components/layouts/components/loadable.jsx';
import Default from '@Components/layouts/components/default';

const pathPrefix = `home`;
const leftPathPrefix = `${pathPrefix}/left-page`;
const rightPathPrefix = `${pathPrefix}/right-page`;
const extraPathPrefix = `${pathPrefix}/extra-blocks`;

const IntelliCommunityLeftPageMinorityNationalityRank = loadable({ path: `${leftPathPrefix}/minority-nationality-rank` });
const IntelliCommunityLeftPagePopulation = loadable({ path: `${leftPathPrefix}/population` });

const IntelliCommunityMiddlePage = loadable({ path: `${pathPrefix}/middle-page` });

const IntelliCommunityRightPageEarlyWarnCount = loadable({ path: `${rightPathPrefix}/early-warn-count` });
const IntelliCommunityRightPageHouseType = loadable({ path: `${rightPathPrefix}/house-type` });
const IntelliCommunityRightPageInductionDevice = loadable({ path: `${rightPathPrefix}/induction-device` });

const IntelliCommunityTitle = loadable({ path: `${extraPathPrefix}/title` });

export const componentsMap = new Map([
    [
        'default',
        {
            label: '默认组件',
            name: 'default',
            component: Default,
        },
    ],
    [
        'IntelliCommunityLeftPageMinorityNationalityRank',
        {
            label: '智慧社区-左屏-少数民族排行',
            name: 'IntelliCommunityLeftPageMinorityNationalityRank',
            component: IntelliCommunityLeftPageMinorityNationalityRank,
        },
    ],
    [
        'IntelliCommunityLeftPagePopulation',
        {
            label: '智慧社区-左屏-人口统计',
            name: 'IntelliCommunityLeftPagePopulation',
            component: IntelliCommunityLeftPagePopulation,
        },
    ],
    [
        'IntelliCommunityMiddlePage',
        {
            label: '智慧社区-中屏',
            name: 'IntelliCommunityMiddlePage',
            component: IntelliCommunityMiddlePage,
        },
    ],
    [
        'IntelliCommunityRightPageEarlyWarnCount',
        {
            label: '智慧社区-右屏-预警两',
            name: 'IntelliCommunityRightPageEarlyWarnCount',
            component: IntelliCommunityRightPageEarlyWarnCount,
        },
    ],
    [
        'IntelliCommunityRightPageHouseType',
        {
            label: '智慧社区-右屏-房屋类型',
            name: 'IntelliCommunityRightPageHouseType',
            component: IntelliCommunityRightPageHouseType,
        },
    ],
    [
        'IntelliCommunityRightPageInductionDevice',
        {
            label: '智慧社区-右屏-感知设备',
            name: 'IntelliCommunityRightPageInductionDevice',
            component: IntelliCommunityRightPageInductionDevice,
        },
    ],
    [
        'IntelliCommunityTitle',
        {
            label: '智慧社区-标题',
            name: 'IntelliCommunityTitle',
            component: IntelliCommunityTitle,
        },
    ],
]);
