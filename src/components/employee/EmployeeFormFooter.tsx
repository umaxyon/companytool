import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { IReduxState } from '../../store';
import Button from '@material-ui/core/Button';
import { SingleRow } from '../../utils/RowGridUtil';
import MDDialog from '../form/md/MDDialog';
import { notifyNotReady, setMode } from '../module/StoreFormModule';
import { snackMessage, clearSnackMessage } from '../module/StoreCommonModule';
import { updateData } from '../module/StoreDataModule';
import { deleteData, } from './module/EmployeeDataModule';
import { preUpdate } from './module/EmployeeFormModule';


class EmployeeFormFooter extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            open: false,
        }
        this.onClickShowConfirm = this.onClickShowConfirm.bind(this);
        this.notifyClose = this.notifyClose.bind(this);
        this.doDelete = this.doDelete.bind(this);
        this.btnDelete = this.btnDelete.bind(this);
        this.changeMode = this.changeMode.bind(this);
        this.doUpdate = this.doUpdate.bind(this);
        this.getCtx = this.getCtx.bind(this);
    }

    public render() {
        let content;
        switch (this.props.mode) {
            case 'detail': content = this.btnDelete(); break;
            case 'edit': content = this.btnUpdate(this.props.mode); break;
            case 'create': content = this.btnUpdate(this.props.mode); break;
            default: content = <React.Fragment />;
        }
        return content;
    }

    public btnDelete() {
        return (
            <SingleRow style={{ display: 'grid', justifyContent: 'start', alignItems: 'center', paddingTop: '20px' }}>
                <Button
                    type="button"
                    variant="contained"
                    color="secondary"
                    style={{ paddingLeft: '50px', paddingRight: '50px' }}
                    onClick={this.onClickShowConfirm}>
                    削除
                </Button>
                <MDDialog
                    open={this.state.open}
                    notifyClose={this.notifyClose}
                    title='確認'
                    labelOk='はい'
                    onClickOk={this.doDelete}
                    labelCancel='キャンセル'>
                    削除しても良いですか？
                </MDDialog>
            </SingleRow>
        )
    }

    public btnUpdate(mode: string) {
        const title = (mode === 'edit') ? '更新' : '登録';
        return (
            <SingleRow style={{ display: 'grid', justifyContent: 'start', alignItems: 'center', paddingTop: '20px' }}>
                <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    style={{ paddingLeft: '50px', paddingRight: '50px' }}
                    onClick={this.onClickShowConfirm}>
                    {title}
                </Button>
                <MDDialog
                    open={this.state.open}
                    notifyClose={this.notifyClose}
                    title='確認'
                    labelOk='はい'
                    onClickOk={() => { this.doUpdate(`${title}しました。`) }}
                    labelCancel='キャンセル'>
                    {title}しますか？
                </MDDialog>
            </SingleRow>
        )
    }

    public doDelete() {
        const dataId = this.props.data.employee_id;
        const ctx = this.getCtx();
        this.props.notifyNotReady(() => {
            this.props.doDelete(dataId, () => {
                this.props.snackMessage('削除しました。');
                this.props.history.push(`${process.env.PUBLIC_URL}/${ctx}`);
            });
        })
    }

    public doUpdate(message: string) {
        this.props.doUpdate((dataId: string) => {
            this.changeMode('detail', dataId);
            this.props.snackMessage(message);
            this.props.clearSnack();
        });
    }

    public onClickShowConfirm() {
        this.setState({ open: true });
    }

    public notifyClose() {
        this.setState({ open: false });
    }

    private getCtx() {
        return this.props.match.path.split('/')[1];
    }

    private changeMode(mode: string, dataId: string) {
        this.props.changeMode(mode);
        const ctx = this.getCtx();
        const id = this.props.match.params.dataId || dataId;
        window.history.replaceState('', '', `${process.env.PUBLIC_URL}/${ctx}/${mode}/${id}`);
    }
}

const mapStateToProps = (state: IReduxState) => ({
    mode: state.StoreFormModule.mode,
    data: state.StoreDataModule.data,
});
const mapDispatchToProps = (dispatch: any) => ({
    changeMode: (mode: string) => {
        dispatch(setMode(mode));
    },
    notifyNotReady: (callback: any) => { dispatch(notifyNotReady(callback)) },
    doUpdate: (callback: any) => {
        dispatch(preUpdate(
            (data: any) => {
                if (data) {
                    dispatch(updateData(data, (callbackDataId: string) => {
                        if (callback) { callback(callbackDataId); }
                    }));
                }
            }
        ));
    },
    doDelete: (dataId: string, callback: any) => {
        dispatch(deleteData(dataId, () => {
            if (callback) { callback(); }
        }));
    },
    snackMessage: (message: string) => { dispatch(snackMessage(message)); },
    clearSnack: () => {
        setTimeout(() => {
            dispatch(clearSnackMessage())
        }, 3000);
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EmployeeFormFooter));
