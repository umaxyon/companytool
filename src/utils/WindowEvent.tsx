import * as React from 'react';

interface IWindowEventProps {
    onResize?: any,
}

class WindowEvent extends React.Component<IWindowEventProps, any> {
    constructor(props: any) {
        super(props);
        this.getListners = this.getListners.bind(this);
    }

    public componentDidMount() {
        this.getListners().forEach(([type, listner]) => {
            window.addEventListener(type, listner);
        });
    }

    public componentWillUnmount() {
        this.getListners().forEach(([type, listner]) => {
            window.removeEventListener(type, listner);
        });
    }

    public render() {
        return <React.Fragment />;
    }

    private getListners() {
        return Object.keys(this.props)
            .filter(k => k.startsWith('on'))
            .map(k => [k.slice(2).toLowerCase(), this.props[k]]);
    }
}

export default WindowEvent;