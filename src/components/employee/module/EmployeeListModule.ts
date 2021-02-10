import { Dispatch } from 'redux'
import ajax from '../../../utils/AjaxUtil';
import { createEmployeeRow } from '../EmployeeListTop';
import { createEmployeeContractRow } from '../EmployeeContractList';

export enum ActType {
  LOAD_EMPLOYEE_LIST = '社員リストロード',
  BEFORE_INIT_EMPLOYEE_LIST = '社員リスト初期化前',
  CLEAR_EMPLOYEE_LIST = '社員リストクリア',
  LOAD_EMPLOYEE_CONTRACT_LIST = '社員契約リストロード',
  CLEAR_EMPLOYEE_CONTRACT_LIST = '社員契約リストクリア',
}

export interface IEmployeeListState {
  type: string,
  employee_list: any[],
  employee_contract_list: any[],
}

const InitialState: IEmployeeListState = {
  type: ActType.BEFORE_INIT_EMPLOYEE_LIST,
  employee_list: [],
  employee_contract_list: [],
};
// reducer
export default (state = InitialState, action: any) => {
  switch (action.type) {
    case ActType.LOAD_EMPLOYEE_LIST:
      const newList = state.employee_list.concat(action.employee_list);
      return { type: action.type, employee_list: newList, employee_contract_list: state.employee_contract_list };
    case ActType.LOAD_EMPLOYEE_CONTRACT_LIST:
      const newContList = state.employee_contract_list.concat(action.employee_contract_list);
      return { type: action.type, employee_list: state.employee_list, employee_contract_list: newContList };
    case ActType.CLEAR_EMPLOYEE_LIST:
      state.type = ActType.CLEAR_EMPLOYEE_LIST;
      state.employee_list = [];
      return state;
    case ActType.CLEAR_EMPLOYEE_CONTRACT_LIST:
      state.type = ActType.CLEAR_EMPLOYEE_CONTRACT_LIST;
      state.employee_contract_list = [];
      return state;
    default:
      return state;
  }
};


export const startLoadEmployeeList = () => (dispatch: Dispatch, getState: any) => {
  const num = getState().EmployeeListModule.employee_list.length;
  ajax({ url: '/employee/list', params: { num } })
    .then((resp: any) => {
      const len = getState().EmployeeListModule.employee_list.length;
      const employee_list = resp.map((v: any, i: number) => createEmployeeRow(v, i + len));
      dispatch({ type: ActType.LOAD_EMPLOYEE_LIST, employee_list });
    });
}

export const clearListData = () => (dispatch: Dispatch) => {
  dispatch({ type: ActType.CLEAR_EMPLOYEE_LIST, employee_list: [] });
}


/**
 * 社員に紐づく契約一覧取得.
 */
export const startLoadEmployeeContractList = (dataId: string) => (dispatch: Dispatch, getState: any) => {
  const num = getState().EmployeeListModule.employee_contract_list.length;
  ajax({ url: `/contract/list/employee/${dataId}`, data: { num } })
    .then((resp: any) => {
      const len = getState().EmployeeListModule.employee_contract_list.length;
      const client_list = getState().StoreMasterModule.master.client_list;
      const employee_contract_list = resp.map((v: any, i: number) => {
        const client = client_list.find((r: any) => r.value === v.partner_id);
        v.client_name = client ? client.label : '';
        return createEmployeeContractRow(v, i + len);
      });
      dispatch({ type: ActType.LOAD_EMPLOYEE_CONTRACT_LIST, employee_contract_list });
    });
}

export const clearContractListData = () => (dispatch: Dispatch) => {
  dispatch({ type: ActType.CLEAR_EMPLOYEE_CONTRACT_LIST, employee_contract_list: [] });
}
