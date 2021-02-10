import { Dispatch } from 'redux'

export enum GlobalEventActType {
    INITIALIZE = '初期状態',
    WINDOW_RESIZE = 'Windowサイズ変更',
}

export interface IGlobalEventState {
    type: string,
    size: any,
    oldSize: any,
    sizeDiff: any,
}
const InitialState: IGlobalEventState = {
    type: GlobalEventActType.WINDOW_RESIZE,
    size: { h: window.innerHeight, w: window.innerWidth },
    oldSize: { h: window.innerHeight, w: window.innerWidth },
    sizeDiff: { h: 0, w: 0 }
}

// reducer
export default (state = InitialState, action: any) => {
    switch (action.type) {
        case GlobalEventActType.WINDOW_RESIZE:
            const newState = Object.assign({}, state);
            newState.oldSize = state.size;
            newState.size = action.size;
            newState.sizeDiff.h = action.size.h - newState.oldSize.h;
            newState.sizeDiff.w = action.size.w - newState.oldSize.w;
            return newState;
        default:
            return state;
    }
};

export const windowResize = (size: any, ) => (dispatch: Dispatch) => {
    dispatch({ type: GlobalEventActType.WINDOW_RESIZE, size });
}
