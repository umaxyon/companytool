import * as React from 'react'
import { Redirect } from 'react-router';
import { IAuthState } from './module/AuthModule';
import MDIndicator from '../form/md/MDIndicator';

const isLoggedIn = (auth: IAuthState) => {
    if (auth.token !== undefined) {
        return true
    } else {
        return false
    }
}

export const RequireLogin = (props: { auth: IAuthState } & any) => {
    if (!props.auth.ready) {
        return (<MDIndicator />)
    } else {
        if (isLoggedIn(props.auth)) {
            return props.children
        } else {
            return (<Redirect to={`${process.env.PUBLIC_URL}/login`} />)
        }
    }
}

export const requireRole = (role: string, auth: IAuthState) => (component: React.ComponentType) => {
    if (isLoggedIn(auth) && auth.roles.hasRole(role)) {
        return component
    } else {
        // TODO: 権限が足りない場合はどうするか? (何らかのダイアログポップアップ)
        const RedirectToLogin: React.FunctionComponent = () => <Redirect to={`${process.env.PUBLIC_URL}/login`} />
        return RedirectToLogin
    }
}