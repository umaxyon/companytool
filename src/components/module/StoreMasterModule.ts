import { Dispatch, Action } from 'redux'
import ajax from '../../utils/AjaxUtil';

export enum ActType {
  BEFORE_INIT = '初期化前',
  INIT_MASTER = 'マスターロード',
}

export interface IStoreMasterState {
  type: string,
  master: object,
  loaded: boolean,
}

const InitialState: IStoreMasterState = {
  type: ActType.BEFORE_INIT,
  master: {
    staff_list: [],
    staff_other_list: [],
    client_partner_list: [],
  },
  loaded: false,
};
// reducer
export default (state = InitialState, action: Action) => {
  switch (action.type) {
    case ActType.INIT_MASTER:
      return Object.assign({}, state, action);
    default:
      return state;
  }
};

/**
 * マスターロードAction
 */
export const loadMaster = (callback?: any) => (dispatch: Dispatch, getState: any) => {

  if (!getState().StoreMasterModule.loaded) {
    ajax({ url: '/master/all' })
      .then((data: any) => {
        const action = Object.assign({}, getState().StoreMasterModule, {
          type: ActType.INIT_MASTER, master: data, loaded: true,
        });
        dispatch(action);
        if (callback) {
          callback();
        }
      });
  } else if (callback) {
    callback();
  }
}
