import { Dispatch, Action } from 'redux'

export enum StoreCommonActType {
    BEFORE_INIT = '初期化前',
    SNACK_ON = 'Snack通知',
    SNACK_OFF = 'Snackクリア',
}

export interface IStoreCommonState {
    type: string,
    message: string,
}
const InitialState: IStoreCommonState = {
    type: StoreCommonActType.BEFORE_INIT,
    message: '',
}

// reducer
export default (state = InitialState, action: Action) => {
    switch (action.type) {
        case StoreCommonActType.SNACK_ON:
        case StoreCommonActType.SNACK_OFF:
            return Object.assign({}, state, action);
        default:
            return state;
    }
};

/**
 * Snack通知.
 * @param message
 */
export const snackMessage = (message: string, timeout?: number) => (dispatch: Dispatch) => {
    dispatch({ type: StoreCommonActType.SNACK_ON, message });
}

/**
 * Snackオフ.
 */
export const clearSnackMessage = () => (dispatch: Dispatch) => {
    dispatch({ type: StoreCommonActType.SNACK_OFF, message: '' });
}