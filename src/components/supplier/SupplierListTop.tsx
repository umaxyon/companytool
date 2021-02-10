import * as React from 'react';
import { connect } from 'react-redux';
import { IReduxState } from '../../store';
import * as InfiniteScroll from 'react-infinite-scroll-component';
import { createStyles, Theme, withStyles, WithStyles, } from '@material-ui/core';
import { StyleRules } from '@material-ui/core/styles';
import CommonHeader from '../common/CommonHeader';
import { startLoadSupplierList, clearListData } from './module/SupplierListModule';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import SupplierListRow from './SupplierListRow';
import { clearData } from '../module/StoreDataModule';
import { setContext } from '../module/StoreFormModule';
import { changeSchema } from '../module/StoreSchemaModule';
import { clearSnackMessage } from '../module/StoreCommonModule';
import MDSnackbar from '../form/md/MDSnackbar';

const styles = (theme: Theme): StyleRules => createStyles({
  container: {
    justifyContent: 'space-between'
  },
  name: {
  },
  client_oropriety: {
    minWidth: 100
  },
  bp_oropriety: {
    minWidth: 100
  }
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
  size: { h: number, w: number },
}

interface IState {
  rows: string[],
}

export const createSupplierRow = (r: any, cnt: number) => (
  <SupplierListRow key={`suppr_${cnt}`} data={r} count={cnt} />
);

class SupplierListTop extends React.Component<Props, IState> {
  constructor(props: any) {
    super(props);
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
    const endMessage = <div style={{ textAlign: 'center', padding: '30px 0 30px 0' }} />
    return (
      <div>
        <CommonHeader path={this.props.path} />
        <div>
          <List>
            <ListItem>
              <Grid container={true} className={classes.container} spacing={16}>
                <Grid item={true} className={classes.name} xs={6}>取引先名</Grid>
                <Grid item={true} className={classes.client_oropriety}>顧客可否</Grid>
                <Grid item={true} className={classes.bp_oropriety}>BP可否</Grid>
              </Grid>
            </ListItem>
          </List>
          <List component='nav'>
            <Divider />
            <InfiniteScroll
              next={this.load}
              height={h}
              hasMore={false}
              dataLength={1000}
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
  list: state.SupplierListModule.supplier_list,
  storeContext: state.StoreFormModule.context,
  dataLoaded: state.StoreDataModule.loaded,
  message: state.StoreCommonModule.message,
  size: state.GlobalEventModule.size,
});
const mapDispatchToProps = (dispatch: any) => ({
  load: () => { dispatch(startLoadSupplierList()) },
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
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SupplierListTop));