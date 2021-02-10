import { createStyles, Divider, IconButton, SwipeableDrawer, Theme, withStyles, WithStyles } from '@material-ui/core';
import * as React from 'react';

import { StyleRules } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const styles = (theme: Theme): StyleRules => createStyles({
  root: {
    display: 'flex',
  },
  appBar: {
  },
  drawer: {
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
});

interface IContentProp {
  open: boolean,
  onCloseHandler(): void
  onOpenHandler(): void
}

type Props = WithStyles<typeof styles> & IContentProp

class SwipeableTemporaryDrawerLeft extends React.PureComponent<Props> {
  public render() {
    const { classes, children, open, onOpenHandler, onCloseHandler } = this.props;
    return (
      <div className={classes.root}>
        <SwipeableDrawer
          className={classes.drawer}
          open={open}
          onClose={onCloseHandler}
          onOpen={onOpenHandler}>
          <div className={classes.drawerHeader}>
            <IconButton onClick={onCloseHandler}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          {children}
        </SwipeableDrawer>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(SwipeableTemporaryDrawerLeft);