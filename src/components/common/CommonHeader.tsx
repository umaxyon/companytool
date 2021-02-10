import * as React from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';
import { StyleRules } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { IReduxState } from '../../store';
import Button from '@material-ui/core/Button';
import { notifyReady, notifyNotReady, setMode } from '../module/StoreFormModule';
import { snackMessage, clearSnackMessage } from '../module/StoreCommonModule';
import { updateData } from '../module/StoreDataModule';
import { copyData } from '../contract/module/ContractDataModule';
import MDDialog from '../form/md/MDDialog';
import MDSnackbar from '../form/md/MDSnackbar';

const styles = (theme: Theme): StyleRules => createStyles({
  headDiv: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: '1fr 270px',
  },
  btnDiv: {
    display: 'grid',
    alignItems: 'center',
  }
})

type CommonHeaderProps = WithStyles<typeof styles> & {
  mode: string,
  ready: boolean,
  format: any,
  changeMode: any,
  history: any,
  match: any,
  path: string,
  message: string,
  notifyReady: any,
  notifyNotReady: any,
  snackMessage: any,
  clearSnack: any,
  doUpdate: any,
  doCopy: any,
}

interface IState {
  open: boolean,
  path: string,
}

class CommonHeader extends React.Component<CommonHeaderProps, IState> {
  constructor(props: any) {
    super(props);
    this.getModeData = this.getModeData.bind(this);
    this.rewriteAddress = this.rewriteAddress.bind(this);
    this.changeMode = this.changeMode.bind(this);
    this.copyBtn = this.copyBtn.bind(this);
    this.getCtx = this.getCtx.bind(this);
    this.notifyClose = this.notifyClose.bind(this);
    this.btnUpdateOnClick = this.btnUpdateOnClick.bind(this);
    this.doUpdate = this.doUpdate.bind(this);
    this.doCopy = this.doCopy.bind(this);
    this.state = {
      open: false,
      path: this.props.path,
    }
  }

  public componentWillUpdate() {
    if (this.state.path !== this.props.path) {
      this.setState({ path: this.props.path });
    }
  }

  public btnUpdateOnClick() {
    this.setState({ open: true });
  }

  public notifyClose() {
    this.setState({ open: false });
  }

  public render() {
    const { classes } = this.props;
    const modeData = this.getModeData();
    const btn = modeData.disabled ? '' : (
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={modeData.onClick}>
        {modeData.btnCap}
      </Button>
    );
    const ready = this.props.mode ? this.props.ready : true;
    return (
      (ready) ?
        <div className={classes.headDiv}>
          <div style={{ gridColumn: 1, paddingLeft: '10px', }}>
            {modeData.ctxCap}({modeData.title})
          </div>
          <div style={{ gridColumn: 2 }}>
            <div className={classes.btnDiv}>
              <div style={{ gridColumn: 1 }}>{this.copyBtn()}</div>
              <div style={{ gridColumn: 2, justifySelf: 'end', paddingRight: '10px' }}>{btn}</div>
            </div>
          </div>
          <MDDialog
            open={this.state.open}
            notifyClose={this.notifyClose}
            title='確認'
            labelOk='はい'
            onClickOk={() => { this.doUpdate(modeData.doneMessage) }}
            labelCancel='キャンセル'>
            {modeData.confirmMessage}
          </MDDialog>
          {/* <MDDialog
            open={this.state.copyOpen}
            notifyClose={() => { this.setState({ copyOpen: false }) }}
            title='確認'
            labelOk='はい'
            onClickOk={() => { this.doCopy('コピーしました。(登録するまで保存されていません。)') }}
            labelCancel='キャンセル'>
            <div>
              <div>このデータを複製して新規作成モードに移行します。</div>
              <div>よろしいですか？</div>
            </div>
          </MDDialog> */}
          <MDSnackbar />
        </div>
        : <React.Fragment />
    )
  }

  public doUpdate(message: string) {
    this.props.doUpdate(() => {
      this.changeMode('detail');
      this.props.snackMessage(message);
      this.props.clearSnack();
    });
  }

  public doCopy(message: string) {
    this.props.doCopy(() => {
      this.changeMode('copy');
      this.props.snackMessage(message);
      this.props.clearSnack();
    })
  }

  private copyBtn() {
    let btn;
    if (this.getCtx() === 'contract' && this.props.mode === 'detail') {
      btn = (
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => { this.doCopy('コピーしました。(登録するまで保存されていません。)') }}
          style={{ marginRight: '20px', width: '170px' }}>
          コピーして新規作成</Button>
      )
    }
    return btn
  }

  private getModeData() {
    const fmType = this.props.format.contract_type;
    let disabled = false;
    if (this.getCtx() === 'contract') {
      disabled = (fmType) ? false : true;;
    }
    let title = '';
    let btnCap = '';
    let ctxCap = '';
    let onClick;
    let confirmMessage = '';
    let doneMessage = '';
    if (!Object.keys(this.props.match.params).length) {
      title = '一覧';
      btnCap = '新規作成';
      disabled = false;
      onClick = () => { this.changeMode('create') };
    } else {
      switch (this.props.mode) {
        case 'create':
          title = '一覧';
          btnCap = '登録';
          onClick = () => { this.btnUpdateOnClick() };
          confirmMessage = '登録しますか？';
          doneMessage = '登録しました。';
          disabled = true;
          break;
        case 'edit':
          title = '編集';
          btnCap = '更新';
          onClick = () => { this.btnUpdateOnClick() };
          confirmMessage = '更新しますか？';
          doneMessage = '更新しました。';
          disabled = true;
          break;
        case 'detail':
          title = '明細表示';
          btnCap = '編集';
          onClick = () => { this.changeMode('edit') };
          break;
        default:
          title = '一覧';
          btnCap = '新規作成';
          disabled = false;
          onClick = () => { this.changeMode('create') };
      };
    }

    switch (this.getCtx()) {
      case 'contract': ctxCap = '契約情報'; break;
      case 'employee': ctxCap = '社員情報'; break;
      case 'supplier': ctxCap = '取引先情報'; break;
    }

    return { title, btnCap, ctxCap, disabled, onClick, confirmMessage, doneMessage };
  }



  private getCtx() {
    return this.props.match.path.split('/')[1];
  }

  private changeMode(mode: string) {
    this.props.changeMode((mode === 'copy') ? 'create' : mode);
    this.rewriteAddress(mode);
  }

  private rewriteAddress(mode: string) {
    const { dataId } = this.props.match.params;
    const ctx = this.getCtx();
    if (mode === 'copy') {
      window.history.replaceState('', '', `${process.env.PUBLIC_URL}/${ctx}/create`);
    } else if (dataId) {
      this.props.history.replace(`${process.env.PUBLIC_URL}/${ctx}/${mode}/${dataId}`);
    } else {
      this.props.history.push(`${process.env.PUBLIC_URL}/${ctx}/${mode}`);
    }
  }
}

const mapStateToProps = (state: IReduxState) => ({
  mode: state.StoreFormModule.mode,
  format: state.StoreFormModule.currentFormat(),
  ready: state.StoreFormModule.ready,
});
const mapDispatchToProps = (dispatch: any) => ({
  changeMode: (mode: string) => {
    dispatch(setMode(mode));
  },
  notifyReady: (callback: any) => { dispatch(notifyReady(callback)) },
  notifyNotReady: (callback: any) => { dispatch(notifyNotReady(callback)) },
  doUpdate: (callback: any) => {
    dispatch(updateData(() => {
      if (callback) { callback(); }
    }));
  },
  doCopy: (callback: any) => {
    dispatch(copyData(() => {
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
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(CommonHeader)));