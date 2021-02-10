import { Dispatch, Action } from 'redux'
import { setFormData } from '../../utils/FormDataUtil';
import ajax from '../../utils/AjaxUtil';

export enum ActType {
  STORE_BEFORE_INIT = 'ストア初期化前',
  INIT_DATA = 'ストアデータ初期化',
  CHANGE_STORE_DATA = 'ストアデータ変更',
  COPY_STORE_DATA = 'ストアデータコピー',
}

export interface IStoreDataState {
  type: string,
  data: object,
  loaded: boolean,
}

const InitialState: IStoreDataState = {
  type: ActType.STORE_BEFORE_INIT,
  data: {},
  loaded: false,
};

type DataAction = Action & {
  data: any,
}

// reducer
export default (state = InitialState, action: DataAction) => {
  switch (action.type) {
    case ActType.INIT_DATA:
      const newState = Object.assign({}, state, action);
      newState.loaded = !!(action.data && Object.keys(action.data).length);
      return newState;
    case ActType.CHANGE_STORE_DATA:
      return Object.assign({}, state, action);
    case ActType.COPY_STORE_DATA:
      return action;
    default:
      return state;
  }
};

export const clearData = () => (dispatch: Dispatch) => {
  dispatch({ type: ActType.INIT_DATA, data: {} });
}

/**
 * データ変更.
 * @param data
 */
export const changeData = (fromRootId: string, val: any) => (dispatch: Dispatch, getState: any) => {
  if (!fromRootId) {
    return;
  }
  const scm = getState().StoreSchemaModule.currentSchema().schema;
  const formData = getState().StoreDataModule.data;
  const fullId = fromRootId.replace(/^root_/, '');
  const data = setFormData(fullId, val, scm, formData);
  dispatch({ type: ActType.CHANGE_STORE_DATA, data });
}

/**
 * データ更新.
 * @param callback 
 */
export const updateData = (data: any, callback?: any) => (dispatch: any, getState: any) => {
  let context = getState().StoreFormModule.context;
  context = (context === 'supplier') ? 'partner' : context;
  ajax({ url: `/${context}/edit`, method: 'post', data, })
    .then((resp: any) => {
      if (callback) {
        // TODO 新規登録の場合はIDをレスポンスする
        const id = 'id'
        callback(id);
      }
    });
}