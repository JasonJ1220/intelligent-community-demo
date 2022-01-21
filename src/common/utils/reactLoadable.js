import React from 'react';
import Loadable from 'react-loadable';

export default function ReactLoadable({ path, namedExport }) {
    return Loadable({
        loader: () => import(path)[namedExport],
        loading() {
            return <div>Loading...</div>;
        },
    });
}
