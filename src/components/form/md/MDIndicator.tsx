import * as React from 'react';
import { CircularProgress, createStyles, Theme, withStyles, WithStyles, } from '@material-ui/core';
import { StyleRules } from '@material-ui/core/styles';

const styles = (theme: Theme): StyleRules => createStyles({
  progressContainer: {
    display: 'grid',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '50px',
  },
  progress: {
    color: '#cc88cc',
  },
})

type Props = WithStyles<typeof styles>

const MDIndicator : React.SFC<Props> = props => {
  return (
    <div className={props.classes.progressContainer}>
      <div>
        <CircularProgress
          className={props.classes.progress}
          size={50}
          thickness={5}/>
      </div>
      <div>loading...</div>
    </div>
  )
}

export default withStyles(styles)(MDIndicator)