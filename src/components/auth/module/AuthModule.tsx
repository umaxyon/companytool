import { Dispatch, Action } from 'redux'
import ajax from 'src/utils/AjaxUtil';

const JWT_TOKEN = "jwt_token"

export const getLocalToken = () => {
  return localStorage.getItem(JWT_TOKEN) || undefined
}

const setLocalToken = (token: string) => {
  localStorage.setItem(JWT_TOKEN, token)
}

const clearLocalToken = () => {
  localStorage.removeItem(JWT_TOKEN)
}

const isLogIn = (token?: string, error?: string) => {
  return token && !error
}

export enum ActType {
  INIT = '認証初期化',
  REQUEST_LOGIN = 'ログイン要求',
  RECEIVE_LOGIN = 'ログイン結果',
  LOGOUT = 'ログアウト',
}

export class Roles {
  private roles: string[]

  constructor(roles: string[]) {
    this.roles = roles
  }

  public hasRole = (role: string) => {
    return this.roles.includes(role)
  }

  public toString = (): string => {
    return "[Roles: " + this.roles + "]"
  }
}

const NO_ROLES = new Roles([])

const getRolesFromToken = (token: string) => {
  const roles = JSON.parse(atob(token.split(".")[1])).role
  return new Roles(roles)
}

export interface IAuthState {
  ready: boolean,
  isRequesting: boolean,
  token?: string,
  isLoggedIn: boolean,
  roles: Roles,
  error?: string,
}

const InitialState: IAuthState = {
  ready: false,
  isRequesting: false,
  isLoggedIn: false,
  roles: NO_ROLES,
}

// reducer
export default (state = InitialState, action: Action & IAuthState) => {
  if (action.type === ActType.INIT) {
    const isLoggedIn = isLogIn(action.token, undefined)
    const ready = true
    return Object.assign({}, state, action, { isLoggedIn, ready })
  } else if (action.type === ActType.REQUEST_LOGIN) {
    return Object.assign({}, state, action, { isRequesting: true, error: undefined })
  } else if (action.type === ActType.RECEIVE_LOGIN) {
    const isLoggedIn = isLogIn(action.token, undefined)
    if (isLoggedIn) {
      return Object.assign({}, state, action, { isRequesting: false, isLoggedIn, error: undefined })
    } else {
      return Object.assign({}, state, action, { isRequesting: false, isLoggedIn, roles: NO_ROLES })
    }
  } else if (action.type === ActType.LOGOUT) {
    return Object.assign({}, state, action, { token: undefined, isRequesting: false, isLoggedIn: false, roles: NO_ROLES, error: undefined })
  }
  return state
}

// アプリ起動時の初期化(ブラウザリロードなど)
export const initAuth = () => (dispatch: Dispatch, getState: any) => {
  const token = getLocalToken()
  const roles = token ? getRolesFromToken(token) : NO_ROLES
  // console.log("initAuth: " + token + ", roles: " + roles)
  dispatch({ type: ActType.INIT, token, roles, error: undefined });
}

// ログイン実行
export const requestLogin = (username: string, password: string) => (dispatch: Dispatch, getState: any) => {
  ajax({ url: '/login', method: 'post', data: { username, password } })
    .then((data: any) => {
      console.log('login success.')
      const roles = getRolesFromToken(data.token)
      setLocalToken(data.token)
      dispatch({ type: ActType.RECEIVE_LOGIN, token: data.token, roles, error: undefined });
    })
    .catch((error: any) => {
      console.log('login failed.')
      dispatch({ type: ActType.RECEIVE_LOGIN, token: undefined, error: '認証に失敗しました' });
    })
}

// ログアウト(ローカルストレージのトークン削除)
export const logout = () => (dispatch: Dispatch, getState: any) => {
  console.log("logout.")
  clearLocalToken()
  dispatch({ type: ActType.LOGOUT })
}