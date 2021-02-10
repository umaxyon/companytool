import { Dispatch, Action } from 'redux'
import { StoreSchemaActType } from './StoreSchemaModule';

export enum StoreFormActType {
    BEFORE_INIT = 'フォーマット初期化前',
    CHANGE_CONTEXT = 'コンテキスト変更',
    CHANGE_MODE = 'モード変更',
    CHANGE_FORMAT = 'フォーマット変更',
    INIT_EDIT = '初期表示(編集)',
    INIT_DETAIL = '初期表示(詳細)',
    INIT_CREATE = '初期表示(追加)',
    LOADED_COPY = 'コピーロード',
    NOTIFY_READY = 'Ready通知',
    INPUT_ERROR = '入力チェックエラー',
    INPUT_ERROR_NOTHING = '入力チェックエラーなし',
}

export namespace StoreFormActType {
    export function of(mode: string | undefined) {
        switch (mode) {
            case 'create': return StoreFormActType.INIT_CREATE;
            case 'edit': return StoreFormActType.INIT_EDIT;
            case 'detail': return StoreFormActType.INIT_DETAIL;
            default: return StoreFormActType.BEFORE_INIT;
        }
    }
}

export interface IStoreFormState {
    type: string,
    context: string,
    ready: boolean,
    mode: string,
    format: {
        contract: any,
        employee: any,
        supplier: any,
    },
    message: string,
    errList: any,
    currentFormat: any,
    isChangeContext: any,
    isChangeMode: any,
}

const InitialState: IStoreFormState = {
    type: StoreFormActType.BEFORE_INIT,
    context: '',
    ready: false,
    mode: '',
    format: {
        contract: {},
        employee: {},
        supplier: {},
    },
    message: '',
    errList: [],
    currentFormat() {
        return this.format[this.context] || {};
    },
    isChangeContext(ctxName: string) {
        return (!this.context) || this.context !== ctxName;
    },
    isChangeMode(modeName: string) {
        return (!this.mode) || this.mode !== modeName;
    }
};

type FormAction = Action & {
    mode?: string,
}

// reducer
export default (state = InitialState, action: FormAction) => {
    switch (action.type) {
        case StoreFormActType.INIT_EDIT:
        case StoreFormActType.INIT_DETAIL:
        case StoreFormActType.INIT_CREATE:
        case StoreFormActType.CHANGE_CONTEXT:
        case StoreFormActType.CHANGE_MODE:
        case StoreFormActType.NOTIFY_READY:
        case StoreFormActType.INPUT_ERROR:
        case StoreFormActType.INPUT_ERROR_NOTHING:
            return Object.assign({}, state, action);
        case StoreFormActType.CHANGE_FORMAT:
            const formatResult = Object.assign({}, state.currentFormat(), action);
            delete formatResult.type;
            const newState = Object.assign({}, state);
            newState.format[newState.context] = formatResult;
            newState.type = action.type;
            return newState;
        default:
            return state;
    }
};

/**
 * コンテキスト設定.
 * 
 * @param context 
 */
export const setContext = (context: string | undefined) => (dispatch: Dispatch, getState: any) => {
    dispatch({ type: StoreFormActType.CHANGE_CONTEXT, context, ready: false });
    dispatch({ type: StoreSchemaActType.CHANGE_SCHEMA, context });
}

/**
 * Ready通知(OK).
 */
export const notifyReady = (callback?: any) => (dispatch: Dispatch) => {
    dispatch({ type: StoreFormActType.NOTIFY_READY, ready: true });
    if (callback) {
        setTimeout(callback, 10);
    }
}

/**
 * 入力チェックエラー通知.
 * @param errList
 */
export const notifyInputError = (errList: any) => (dispatch: Dispatch) => {
    const type = (errList.length === 0) ? StoreFormActType.INPUT_ERROR_NOTHING : StoreFormActType.INPUT_ERROR;
    dispatch({type, errList});
}

/**
 * Ready通知(準備中(プログレス))
 * @param callback 
 */
export const notifyNotReady = (callback?: any) => (dispatch: Dispatch) => {
    dispatch({ type: StoreFormActType.NOTIFY_READY, ready: false });
    if (callback) {
        setTimeout(callback, 10);
    }
}

/**
 * モード設定.
 * @param mode
 */
export const setMode = (mode: string | undefined): any => (dispatch: Dispatch) => {
    dispatch({ type: StoreFormActType.CHANGE_MODE, mode });
}