import locales from '@Common/locales';

const enableStatus = [
    { id: 0, key: 'disable', name: () => locales.get('enums.enableStatus.disable') },
    { id: 1, key: 'enable', name: () => locales.get('enums.enableStatus.enable') },
];

const commonEnum = {
    enableStatus,
};

export default commonEnum;
