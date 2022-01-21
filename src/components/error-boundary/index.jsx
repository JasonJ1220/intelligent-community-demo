import React from 'react';
import Exception from '../exception';
import { withRouter } from 'react-router-dom';

class ErrorBoundary extends React.Component {
    showException = false;

    static getDerivedStateFromError(error) {}
    componentDidCatch(error, info) {
        console.error(error, '-----', info);
        this.showException = true;
        this.forceUpdate();
    }

    render() {
        if (this.showException) {
            this.showException = false;
            return <Exception />;
        }

        return this.props.children;
    }
}

export default withRouter(ErrorBoundary);
