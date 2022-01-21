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
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <span>Loading...</span>
        </div>
    );
}

export default function loadable({ path, nameExport = 'default', showLoading = false }) {
    let dataModelDefinition = undefined;
    let configurableProps = undefined;

    const loadableComponent = ReactLoadable({
        loader: () => import(`@Pages/${path}`),
        loading: (props) => {
            if (showLoading) {
                if (props.error) {
                    console.error(props.error);
                    return <div>啊哦，加载出错了...</div>;
                } else {
                    return <Loading />;
                }
            } else {
                return null;
            }
        },
        render(loaded, props) {
            const Component = loaded[nameExport];
            dataModelDefinition = Component.dataModelDefinition;
            configurableProps = Component.configurableProps;

            return <Component {...props} />;
        },
    });

    loadableComponent.dataModelDefinition = dataModelDefinition;
    loadableComponent.configurableProps = configurableProps;

    return loadableComponent;
}
