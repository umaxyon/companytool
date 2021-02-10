import * as React from 'react';
import { connect } from 'react-redux';
import { IReduxState } from '../../store';
import * as InfiniteScroll from 'react-infinite-scroll-component';
import { createStyles, Theme, withStyles, WithStyles, } from '@material-ui/core';
import { StyleRules } from '@material-ui/core/styles';
import CommonHeader from '../common/CommonHeader';
import { startLoadEmployeeList, clearListData } from './module/EmployeeListModule';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import EmployeeListRow from './EmployeeListRow';
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
    width: 120,
  },
  phone: {
    width: 130,
  },
  age: {
    width: 50,
  },
  employee_type: {
    width: 120,
  },
  career_history: {
    width: 90,
  },
  nearest_station: {
    width: 180,
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
  size: { h: number, w: number },
}

interface IState {
  rows: string[],
}

export const createEmployeeRow = (r: any, cnt: number) => (
  <EmployeeListRow key={`empr_${cnt}`} data={r} count={cnt} />
);

class EmployeeListTop extends React.Component<Props, IState> {
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
                <Grid item={true} className={classes.name}>エンジニア名</Grid>
                <Grid item={true} className={classes.phone}>個人携帯番号</Grid>
                <Grid item={true} className={classes.age}>年齢</Grid>
                <Grid item={true} className={classes.employee_type}>雇用形態</Grid>
                <Grid item={true} className={classes.career_history}>社歴</Grid>
                <Grid item={true} className={classes.nearest_station}>最寄駅</Grid>
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
  list: state.EmployeeListModule.employee_list,
  storeContext: state.StoreFormModule.context,
  dataLoaded: state.StoreDataModule.loaded,
  message: state.StoreCommonModule.message,
  size: state.GlobalEventModule.size,
});
const mapDispatchToProps = (dispatch: any) => ({
  load: () => { dispatch(startLoadEmployeeList()) },
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
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EmployeeListTop));