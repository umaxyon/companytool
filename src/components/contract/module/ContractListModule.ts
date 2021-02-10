import { Dispatch } from 'redux'
import ajax from '../../../utils/AjaxUtil';
import { createContractRow } from '../ContractListTop';
import * as math from 'mathjs';

export enum ActType {
  LOAD_CONTRACT_LIST = '契約リストロード',
  BEFORE_INIT_CONTRACT_LIST = '契約リスト初期化前',
  CLEAR_CONTRACT_LIST = '契約リストクリア',
}

export interface IContractListState {
  type: string,
  contract_list: any[],
  is_end: boolean,
}

const InitialState: IContractListState = {
  type: ActType.BEFORE_INIT_CONTRACT_LIST,
  contract_list: [],
  is_end: false,
};
// reducer
export default (state = InitialState, action: any) => {
  switch (action.type) {
    case ActType.LOAD_CONTRACT_LIST:
      const newList = state.contract_list.concat(action.contract_list);
      const is_end = (newList.length >= action.max_count);

      return { type: action.type, contract_list: newList, is_end };
    case ActType.CLEAR_CONTRACT_LIST:
      return action;
    default:
      return state;
  }
};


export const startLoadContractList = () => (dispatch: Dispatch, getState: any) => {
  const limit = 100;
  const num = getState().ContractListModule.contract_list.length;
  const page = math.chain(math.bignumber(num)).divide(limit).floor().done().toString();

  const param = `?page=${page}&limit=${limit}`;

  ajax({ url: `/contract/list${param}` })
    .then((resp: any) => {
      const len = getState().ContractListModule.contract_list.length;
      const contract_list = resp.contract_list.map((v: any, i: number) => createContractRow(v, i + len));
      dispatch({ type: ActType.LOAD_CONTRACT_LIST, contract_list, max_count: resp.max_count });
    });
}

export const clearListData = () => (dispatch: Dispatch) => {
  dispatch({ type: ActType.CLEAR_CONTRACT_LIST, contract_list: [] });
}