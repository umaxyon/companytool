import classNames from 'classnames';
import * as React from 'react';
import './App.css';

import CommonTop from './components/common/CommonTop';
import EmployeeTop from './components/employee/EmployeeTop';
import SupplierListTop from './components/supplier/SupplierListTop';
import ContractListTop from './components/contract/ContractListTop';
import { CssBaseline, List, ListItemIcon, ListItemText } from '@material-ui/core';
import { createStyles, StyleRules, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import FaceIcon from '@material-ui/icons/Face';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import PeopleIcon from '@material-ui/icons/People';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import CustomAppBar from './components/CustomAppBar';
import EmployeeListTop from './components/employee/EmployeeListTop';
import Home from './components/Home';
import { ListItemLink } from './components/ListItemLink';
import SwipeableTemporaryDrawerLeft from './components/SwipeableTemporaryDrawerLeft';
import withRoot from './utils/withRoot';
import { history } from './store';
import ErrorBoundary from './components/ErrorBoundary';
import { connect } from 'react-redux';
import { RequireLogin } from './components/auth/Auth';
import Login from './components/auth/Login';
import { initAuth, IAuthState, logout } from './components/auth/module/AuthModule';
import WindowEvent from './utils/WindowEvent';
import { windowResize } from './module/GlobalEventModule';

const styles = (theme: Theme): StyleRules => createStyles({
  root: {
    // display: 'flex',
  },
  list: {
    width: 240,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    // flexGrow: 1,
    // padding: theme.spacing.unit * 3,
  },
})

interface IState {
  drawerOpen: boolean
}
type IProps = WithStyles<typeof styles> & {
  initAuth: any,
  logout: any,
  onResize: any,
  auth: IAuthState,
}

const menuItems = [
  {
    icon: <FaceIcon />,
    path: process.env.PUBLIC_URL + "/employee",
    text: "社員一覧"
  },
  {
    icon: <RecentActorsIcon />,
    path: process.env.PUBLIC_URL + "/contract",
    text: "契約一覧"
  },
  {
    icon: <PeopleIcon />,
    path: process.env.PUBLIC_URL + "/supplier",
    text: "取引先一覧"
  },
]

class App extends React.Component<IProps, IState> {
  public state = {
    drawerOpen: false
  }

  constructor(props: IProps) {
    super(props);
  }

  public componentWillMount() {
    this.props.initAuth()
  }

  public handleOpenDrawer = () => {
    this.setState({ drawerOpen: true });
  }
  public handleCloseDrawer = () => {
    this.setState({ drawerOpen: false });
  }
  public handleToggleDrawer = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  public handleLogout = () => {
    this.props.logout()
  }

  public render() {
    const { classes, auth } = this.props;

    /*
     * TODO: component={requireEditor(EmployeeEdit)}のような記述で権限ガードする仕組みにしたい(現状動作不定)
     */
    // const requireEditor = requireRole("ROLE_EDITOR", auth)
    return (
      <ErrorBoundary>
        <WindowEvent onResize={this.props.onResize} />
        <ConnectedRouter history={history}>
          <div className={classes.root}>
            <CssBaseline />
            <CustomAppBar title="社内ツール" onClickMenuButton={this.handleToggleDrawer} />
            <main className={classNames(classes.content)}>

              <Switch>
                <Route exact={true} path={process.env.PUBLIC_URL + "/login"} component={Login} />
                <RequireLogin auth={auth}>
                  <Switch>
                    <Route exact={true} path={process.env.PUBLIC_URL + "/"} component={Home} />
                    <Route exact={true} path={process.env.PUBLIC_URL + "/employee"} component={EmployeeListTop} />
                    <Route exact={true} path={process.env.PUBLIC_URL + "/employee/:mode"} component={CommonTop} />
                    <Route exact={true} path={process.env.PUBLIC_URL + "/employee/:mode/:dataId"} component={CommonTop} />
                    <Route exact={true} path={process.env.PUBLIC_URL + "/contract"} component={ContractListTop} />
                    <Route exact={true} path={process.env.PUBLIC_URL + "/contract/:mode"} component={CommonTop} />
                    <Route exact={true} path={process.env.PUBLIC_URL + "/contract/:mode/:dataId"} component={EmployeeTop} />
                    <Route exact={true} path={process.env.PUBLIC_URL + "/supplier"} component={SupplierListTop} />
                    <Route exact={true} path={process.env.PUBLIC_URL + "/supplier/:mode"} component={CommonTop} />
                    <Route exact={true} path={process.env.PUBLIC_URL + "/supplier/:mode/:dataId"} component={CommonTop} />
                  </Switch>
                </RequireLogin>
              </Switch>
            </main>
            <div className={classes.drawerHeader} />
            <SwipeableTemporaryDrawerLeft
              open={this.state.drawerOpen}
              onOpenHandler={this.handleOpenDrawer}
              onCloseHandler={this.handleCloseDrawer}>
              <List className={classes.list}>
                {menuItems.map((menuItem, index) => (
                  <ListItemLink button={true} to={menuItem.path} key={menuItem.text} onClick={this.handleCloseDrawer}>
                    <ListItemIcon>{menuItem.icon}</ListItemIcon>
                    <ListItemText primary={menuItem.text} />
                  </ListItemLink>
                ))}
              </List>
            </SwipeableTemporaryDrawerLeft>
          </div >
        </ConnectedRouter>
      </ErrorBoundary>
    )
  }
}

const mapStateToProps = (state: { AuthModule: IAuthState }) => {
  return {
    auth: state.AuthModule,
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  initAuth: () => { dispatch(initAuth()); },
  logout: () => { dispatch(logout()) },
  onResize: () => {
    const size = {
      w: window.innerWidth,
      h: window.innerHeight,
    }
    dispatch(windowResize(size))
  },
})
export default connect(mapStateToProps, mapDispatchToProps)(withRoot(withStyles(styles)(App)));
