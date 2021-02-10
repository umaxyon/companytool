import * as React from 'react';
import { connect } from 'react-redux';
import { IReduxState } from '../../../store';
import { clearSnackMessage } from '../../module/StoreCommonModule';
import Snackbar from '@material-ui/core/Snackbar';

interface IMDSnackbarProps {
    message: string,
    timeout?: number,
    clearSnackMessage: any,
}

class MDSnackbar extends React.Component<IMDSnackbarProps, any> {
    constructor(props: any) {
        super(props);
        // this.closeMe = this.closeMe.bind(this);
    }

    public render() {
        const open = (this.props.message) ? true : false;
        return (
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open}
                message={this.props.message} />
        )
    }

    // public closeMe() {
    //     this.props.clearSnackMessage();
    // }
}
const mapStateToProps = (state: IReduxState) => ({
    message: state.StoreCommonModule.message,
});
const mapDispatchToProps = (dispatch: any) => ({
    clearSnackMessage: () => { dispatch(clearSnackMessage()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(MDSnackbar);
