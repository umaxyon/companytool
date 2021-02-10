import * as React from 'react';
import CommonTop from '../common/CommonTop'

interface IState {
    rows: string[],
}


class EmployeeTop extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <div>
                <CommonTop />
            </div>
        )
    }
}

export default EmployeeTop;