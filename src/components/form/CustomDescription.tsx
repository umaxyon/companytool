import * as React from "react";
import { connect } from 'react-redux';
import { IReduxState } from '../../store';

interface IProps {
    mode: string,
    description: string
}

class CustomDescription extends React.Component<IProps, any> {

    public render() {
        const { description, mode } = this.props;
        return (
            (mode !== 'detail') ?
                <div style={{ fontSize: '11px', color: '#bbb', paddingBottom: '15px', marginTop: '-5px' }}>{description}</div>
                : <React.Fragment />
        );
    }
}

const mapStateToProps = (state: IReduxState) => ({
    mode: state.StoreFormModule.mode,
});
export default connect(mapStateToProps)(CustomDescription);