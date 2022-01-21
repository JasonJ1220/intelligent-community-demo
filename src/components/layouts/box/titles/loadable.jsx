import React from 'react';
import ReactLoadable from 'react-loadable';

function Loading() {
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                color: '#fff',
                fontSize: '25px',
                textAlign: 'center',
                lineHeight: '100%',
            }}
        >
            Loading...
        </div>
    );
}

export default function loadable({ path, nameExport, showLoading = false }) {
    let supportSettingProps = undefined;

    // TODO: 动态设置basePathAlias加载组件失败
    const loadableComponent = ReactLoadable({
        loader: () => import(`@Components/layouts/box/${path}`),
        loading: showLoading ? <Loading /> : null,
        render(loaded, props) {
            const Component = loaded[nameExport];
            supportSettingProps = Component.supportSettingProps;
            console.log(supportSettingProps);

            return <Component {...props} />;
        },
    });

    loadableComponent.supportSettingProps = supportSettingProps;

    return loadableComponent;
}
