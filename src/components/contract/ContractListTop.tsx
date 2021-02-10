import * as React from 'react';
import { connect } from 'react-redux';
import { IReduxState } from '../../store';
import * as InfiniteScroll from 'react-infinite-scroll-component';
import { createStyles, Theme, withStyles, WithStyles, } from '@material-ui/core';
import { StyleRules } from '@material-ui/core/styles';
import CommonHeader from '../common/CommonHeader';
import { startLoadContractList, clearListData } from './module/ContractListModule';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ContractListRow from './ContractListRow';
import { clearData } from '../module/StoreDataModule';
import { setContext } from '../module/StoreFormModule';
import { changeSchema } from '../module/StoreSchemaModule';
import { clearSnackMessage } from '../module/StoreCommonModule';
import MDSnackbar from '../form/md/MDSnackbar';


const styles = (theme: Theme): StyleRules => createStyles({
  container: {
    justifyContent: 'space-between'
  },
  job_no: {
    width: 80,
  },
  client_name: {
    width: 180,
  },
  staff_name: {
    width: 160,
  },
  contract_type: {
    width: 80,
  },
  start_end_date: {
    width: 210,
  },
})

type Props = WithStyles<typeof styles> & {
  match: {
    path: string,
    params: {
      mode?: string,
      dataId?: string,
    },
  },
  path: string,
  message: string,
  dispatch: any,
  list: any[],
  storeContext: string,
  dataLoaded: boolean,
  init: any,
  load: any,
  clearSnack: any,
  clearListData: any,
  isEnd: boolean,
  size: { h: number, w: number },
}

interface IState {
  rows: string[],
}

export const createContractRow = (r: any, cnt: number) => (
  <ContractListRow key={`contractR${cnt}`} data={r} count={cnt} />
);

class ContractListTop extends React.Component<Props, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      rows: [],
    }
    this.ctx = this.ctx.bind(this);
    this.load = this.load.bind(this);
    this.load();
    if (this.props.message) {
      this.props.clearSnack();
    }
  }

  public shouldComponentUpdate() {
    const ctx = this.ctx();
    if (this.props.storeContext !== ctx && this.props.dataLoaded) {
      this.props.init(ctx);
    }
    return true;
  }

  public componentWillUnmount() {
    this.props.clearListData();
  }

  public render() {
    const { classes } = this.props
    const h = (this.props.size.h - 210);

    const endMessage = (this.props.isEnd) ? (
      <div style={{ textAlign: 'center', padding: '30px 0 30px 0' }} />
    ) : (
      <div style={{ textAlign: 'center', padding: '5px 0 5px 0' }}>
        <Button onClick={this.load}>さらに読み込む</Button>
      </div>
    )

    return (
      <div>
        <CommonHeader path={this.props.path} />
        <div>
          <List>
            <ListItem>
              <Grid container={true} className={classes.container} spacing={16}>
                <Grid item={true} className={classes.job_no}>Job No.</Grid>
                <Grid item={true} className={classes.client_name}>顧客名</Grid>
                <Grid item={true} className={classes.staff_name}>エンジニア名</Grid>
                <Grid item={true} className={classes.contract_type}>契約形態</Grid>
                <Grid item={true} className={classes.start_end_date}>契約開始日/終了日</Grid>
              </Grid>
            </ListItem>
          </List>
          <List component='nav'>
            <Divider />
            <InfiniteScroll
              next={this.load}
              height={h}
              hasMore={false}
              dataLength={10}
              loader={this.load}
              endMessage={endMessage}>
              {this.props.list}
            </InfiniteScroll>
          </List>
        </div>
        <MDSnackbar />
      </div>
    )
  }

  public load() {
    this.props.load();
  }

  private ctx() {
    return this.props.match.path.split('/')[1];
  }
}
const mapStateToProps = (state: IReduxState) => ({
  list: state.ContractListModule.contract_list,
  isEnd: state.ContractListModule.is_end,
  storeContext: state.StoreFormModule.context,
  dataLoaded: state.StoreDataModule.loaded,
  message: state.StoreCommonModule.message,
  size: state.GlobalEventModule.size,
});
const mapDispatchToProps = (dispatch: any) => ({
  load: () => { dispatch(startLoadContractList()) },
  init: (ctx: string) => {
    dispatch(setContext(ctx));
    dispatch(changeSchema(ctx));
    dispatch(clearData());
  },
  clearSnack: () => {
    setTimeout(() => {
      dispatch(clearSnackMessage())
    }, 3000);
  },
  clearListData: () => {
    dispatch(clearListData())
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ContractListTop));