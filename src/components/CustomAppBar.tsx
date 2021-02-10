import { AppBar, createStyles, CssBaseline, IconButton, Theme, Toolbar, Typography, withStyles, WithStyles, Button } from '@material-ui/core';
import * as React from 'react';

import { StyleRules } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { logout, IAuthState } from './auth/module/AuthModule';

const styles = (theme: Theme): StyleRules => createStyles({
  root: {
    flexGrow: 1
  },
  appBar: {
    backgroundColor: "lightgreen",
    color: "#585"
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

interface IContentProp {
  title: string
  auth: IAuthState
  onClickMenuButton(): void
  logout(): void
}

type Props = WithStyles<typeof styles> & IContentProp

interface IState {
  open: boolean
}

class CustomAppBar extends React.Component<Props, IState> {
  public render() {
    const { title, classes, children, onClickMenuButton, auth } = this.props;

    const logoutButton = auth.isLoggedIn ? <Button color="inherit" onClick={this.props.logout}>ログアウト</Button> : ""

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="sticky"
          className={classNames(classes.appBar)}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={onClickMenuButton}
              className={classNames(classes.menuButton)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap={true} className={classes.title}>
              {title}
            </Typography>
            {logoutButton}
            {children}
          </Toolbar>
        </AppBar>
      </div>
    );
  }

  public handleClickLogout = () => {
    this.props.logout()
  }
}

const mapStateToProps = (state: { AuthModule: IAuthState }) => {
  return {
    auth: state.AuthModule,
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  logout: () => { dispatch(logout()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(CustomAppBar));