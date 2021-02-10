import * as React from 'react'
import { WithStyles, Theme, Button, FormControl, InputLabel, Input, InputAdornment, IconButton, FormHelperText } from "@material-ui/core";
import { StyleRules, createStyles, withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { requestLogin, IAuthState } from './module/AuthModule';
import { withRouter, Redirect } from 'react-router';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const styles = (theme: Theme): StyleRules => createStyles({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    formControl: {
        maxWidth: 300,
    },
    textfield: {
    },
    button: {
        marginTop: theme.spacing.unit * 4,
        maxWidth: 160,
    },
})

type Props = WithStyles<typeof styles> & {
    requestLogin: any,
    authModule: IAuthState,
    router: any,
}

interface IState {
    username: string,
    password: string,
    showPassword: boolean,
}

class Login extends React.Component<Props, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            password: '',
            showPassword: false,
        }
    }

    public render = () => {
        const { classes } = this.props
        const token = this.props.authModule.token
        const error = this.props.authModule.error
        const hasError = !!error
        if (token && !hasError) {
            return <Redirect to={`${process.env.PUBLIC_URL}/`} />
        } else {
            return (
                <div className={classes.root}>
                    <h1>ログイン</h1>
                    <div className={classes.form}>
                        <FormControl className={classes.formControl} error={hasError} required={true}>
                            <InputLabel htmlFor="userid">ユーザID</InputLabel>
                            <Input
                                id="userid"
                                className={classes.textField}
                                value={this.state.username}
                                onChange={this.handleChangeWith("username")}
                                aria-describedby="component-error-text"
                            />
                            <FormHelperText id="component-error-text">{error}</FormHelperText>
                        </FormControl>
                        <FormControl className={classes.formControl} error={hasError} required={true}>
                            <InputLabel htmlFor="password">パスワード</InputLabel>
                            <Input
                                id="password"
                                className={classes.textField}
                                value={this.state.password}
                                type={this.state.showPassword ? "text" : "password"}
                                onChange={this.handleChangeWith("password")}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="Toggle password visibility"
                                            onClick={this.handleClickShowPassword}
                                        >
                                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <Button variant="contained" color="primary" className={classes.button} onClick={this.clickLogin}>ログイン</Button>
                    </div>
                </div>
            )
        }
    }

    private handleChangeWith = (key: 'username' | 'password') => (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ [key]: e.target.value } as Pick<IState, typeof key>)
    }

    private handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }))
    }

    private clickLogin = () => {
        this.props.requestLogin(this.state.username, this.state.password)
    }
}


const mapStateToProps = (state: any) => {
    return {
        path: state.router.location.pathname,
        authModule: state.AuthModule,
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    requestLogin: (username: string, password: string) => { dispatch(requestLogin(username, password)); }
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(Login)));