import * as React from 'react';

class ErrorBoundary extends React.Component {

    public componentDidCatch(error: any, info: any) {
        console.log(info);
        console.log(error);
    }

    public render() {
        return this.props.children;
    }
}

export default ErrorBoundary;