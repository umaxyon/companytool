import * as React from "react";
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { IReduxState } from '../../../store';
import { connect } from 'react-redux';

const styles = (theme: any) => ({
  root: { width: '100%' },
});

const ExpansionPanel = withStyles(theme => ({
  root: {
    paddingLeft: 0,
    paddingRight: 0,
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
  },
}))(MuiExpansionPanel);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    paddingLeft: '2px',
    paddingRight: '2px',
    backgroundColor: '#f6f6f6',
  },
}))(MuiExpansionPanelDetails);

interface IProps {
  classes: any,
  className?: string,
  condition?: string,
  format: any,
};

class MDExpansionPanel extends React.Component<IProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      className: "",
      condition: "",
    }
  }

  public componentDidMount() {
    let st = this.state;
    if (this.props.className) {
      st = Object.assign({}, st, { className: this.props.className, condition: this.props.condition });
    }
    this.setState(st);
  }

  public render() {
    const { classes } = this.props;
    const condition = this.props.format[this.state.condition];
    const expanded: boolean = !!condition && (condition.indexOf(this.state.className) > -1);

    return (
      <div className={classes.root}>
        <ExpansionPanel
          className={this.state.className}
          expanded={expanded}>
          <ExpansionPanelDetails>
            {this.props.children}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    )
  }
}

const mapStateToProps = (state: IReduxState) => ({
  format: state.StoreFormModule.currentFormat(),
});
export default connect(mapStateToProps)(withStyles(styles)(MDExpansionPanel));