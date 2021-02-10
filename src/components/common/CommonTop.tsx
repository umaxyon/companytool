import { createStyles, Theme, withStyles, WithStyles, } from '@material-ui/core';
import { StyleRules } from '@material-ui/core/styles';
import { withRouter } from 'react-router'
import * as React from 'react';
import CommonForm from './CommonForm';
import { loadSchema } from '../module/StoreSchemaModule';
import { startInitialize as initStartContract } from '../contract/module/ContractFormModule';
import { startInitialize as initStartEmployee } from '../employee/module/EmployeeFormModule';
import { startInitialize as initStartSupplier } from '../supplier/module/SupplierFormModule';
import {
    changeFormat as chgFmtContract,
    changeFormatBlur as chgFmtBlurContract,
} from '../contract/module/ContractFormModule';
import {
    changeFormat as chgFmtEmployee,
    changeFormatBlur as chgFmtBlurEmployee,
} from '../employee/module/EmployeeFormModule';
import {
    changeFormat as chgFmtSupplier,
    changeFormatBlur as chgFmtBlurSupplier,
} from '../supplier/module/SupplierFormModule';

import { connect } from 'react-redux';
import CommonHeader from '../common/CommonHeader';

const styles = (theme: Theme): StyleRules => createStyles({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
})

const contextFn = {
    'contract': { onChange: chgFmtContract, onChangeBlur: chgFmtBlurContract, initStart: initStartContract },
    'employee': { onChange: chgFmtEmployee, onChangeBlur: chgFmtBlurEmployee, initStart: initStartEmployee },
    'supplier': { onChange: chgFmtSupplier, onChangeBlur: chgFmtBlurSupplier, initStart: initStartSupplier },
}

type Props = WithStyles<typeof styles> & {
    match: {
        params: {
            mode?: string,
            dataId?: string,
        },
    },
    path: string,
    dispatch: any,
    startInit: any,
    loadSchema: any,
}

interface IState {
    path: string,
}

class ContractTop extends React.Component<Props, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            path: this.props.path,
        }
        this.ctx = this.ctx.bind(this);
        this.init = this.init.bind(this);
        this.init();
    }

    public shouldComponentUpdate() {
        const doUpdate = (this.state.path !== window.location.pathname);
        if (doUpdate) {
            this.init();
        }
        return doUpdate;
    }

    public render() {
        const ctx = this.ctx();
        const { onChange, onChangeBlur } = contextFn[ctx];
        const content = (
            <div>
                <CommonHeader path={this.props.path} />
                <CommonForm onChange={onChange} onChangeBlur={onChangeBlur} />
            </div>
        )
        return content;
    }

    public componentDidUpdate() {
        this.setState({ path: window.location.pathname });
    }

    private init() {
        const param = this.urlParam();
        setTimeout(() => {
            this.props.startInit(param, this.ctx());
        }, 20);
    }

    private urlParam() {
        const pub_url: string = process.env.PUBLIC_URL || '';
        const url = window.location.pathname.replace(pub_url, '');

        const buf = url.split('/');
        if (buf.length === 3) {
            const mode = buf[buf.length - 1]
            return { mode }
        } else {
            const mode = buf[buf.length - 2]
            const dataId = buf[buf.length - 1]
            return { mode, dataId };
        }
    }

    private ctx() {
        return this.props.path.split('/')[1];
    }
};

const mapStateToProps = (state: any) => ({
    path: state.router.location.pathname,
})
const mapDispatchToProps = (dispatch: any) => ({
    startInit: (params: any, context: string) => {
        dispatch(contextFn[context].initStart(params, context));
    },
    loadSchema: () => {
        dispatch(loadSchema());
    },
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(ContractTop)));
