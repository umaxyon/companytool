import { AppBar, createStyles, CssBaseline, Divider, Drawer, IconButton, List, ListItemIcon, ListItemText, Theme, Toolbar, Typography, withStyles, WithStyles } from '@material-ui/core';
import * as React from 'react';

import { StyleRules } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';
import { ListItemLink } from './ListItemLink';

const drawerWidth = 240;

const styles = (theme: Theme): StyleRules => createStyles({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

interface IMenuItem {
  icon: React.ReactElement<any>
  text: string
  path: string
}
interface IContentProp {
  title: string
  menuItems: IMenuItem[]
}

type Props = WithStyles<typeof styles> & IContentProp

interface IState {
  open: boolean
}

class PersistentDrawerLeft extends React.Component<Props, IState> {
  public state = {
    open: false,
  };

  public handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  public handleDrawerClose = () => {
    this.setState({ open: false });
  };

  public render() {
    const { title, menuItems: menuItems, classes, children } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap={true}>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {menuItems.map((menuItem, index) => (
              <ListItemLink button={true} to={menuItem.path} key={menuItem.text}>
                <ListItemIcon>{menuItem.icon}</ListItemIcon>
                <ListItemText primary={menuItem.text} />
              </ListItemLink>
            ))}
          </List>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          {children}
        </main>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(PersistentDrawerLeft);