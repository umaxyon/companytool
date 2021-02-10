import * as React from "react";
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { IReduxState } from '../../store';
import MuiCard from '@material-ui/core/Card';
import MuiCardContent from '@material-ui/core/CardContent';

interface IProps {
    className?: string,
    disabled?: string,
    condition: string,
    mode: string,
    appearMode: any[],
    style?: object,
    formModule: any,
    dispatch: any
};

const Card = withStyles(theme => ({
    root: {
        paddingLeft: 0,
        paddingRight: 0,
    },
}))(MuiCard);

const CardContent = withStyles(theme => ({
    root: {
        paddingLeft: '10px',
        paddingRight: '10px',
    },
}))(MuiCardContent);

class CustomCard extends React.Component<IProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            className: "",
            condition: "",
            disabled: "",
            style: { width: "100%", marginBottom: "8px" }
        }
    }

    public componentDidMount() {
        let st = this.state;
        if (this.props.className) {
            st = Object.assign({}, st, { className: this.props.className });
        }
        if (this.props.disabled) {
            const style = Object.assign({}, this.state.style, { height: this.props.disabled ? '0' : 'auto' })
            st = Object.assign({}, st, { style });
        }
        this.setState(st);
    }

    public render() {
        let appear: boolean = false;
        const appearMode = this.props.appearMode;
        if (appearMode) {
            const row = appearMode.find((r: string) => r === this.props.mode);
            appear = !!row;
        } else {
            const condition = this.props.formModule[this.props.condition];
            appear = (!condition) || (condition.indexOf(this.state.className) > -1);
        }
        const style = Object.assign({}, this.state.style);
        if (appear) {
            style.height = 'auto';
            style.marginBottom = '20px';
        } else {
            style.height = '0';
            style.marginBottom = '0';
        }

        return (
            <Card
                className={this.state.className}
                style={style}>
                <CardContent>{this.props.children}</CardContent>
            </Card>);
    }
}

const mapStateToProps = (state: IReduxState) => ({
    formModule: state.StoreFormModule.currentFormat(),
    mode: state.StoreFormModule.mode,
});
export default connect(mapStateToProps)(CustomCard);
