import { Dispatch } from 'redux'
import ajax from '../../../utils/AjaxUtil';
import { createSupplierRow } from '../SupplierListTop';
import { createPartnerContractRow } from '../PartnerContractList';


export enum ActType {
  LOAD_SUPPLIER_LIST = '取引先リストロード',
  BEFORE_INIT_SUPPLIER_LIST = '取引先リスト初期化前',
  CLEAR_PARTNER_LIST = '取引先リストクリア',
  LOAD_PARTNER_CONTRACT_LIST = '取引先契約リストロード',
  CLEAR_PARTNER_CONTRACT_LIST = '取引先契約リストクリア',
}

export interface ISupplierListState {
  type: string,
  supplier_list: any[],
  partner_contract_list: any[],
}

const InitialState: ISupplierListState = {
  type: ActType.BEFORE_INIT_SUPPLIER_LIST,
  supplier_list: [],
  partner_contract_list: [],
};
// reducer
export default (state = InitialState, action: any) => {
  switch (action.type) {
    case ActType.LOAD_SUPPLIER_LIST:
      const newList = state.supplier_list.concat(action.supplier_list);
      return { type: action.type, supplier_list: newList, partner_contract_list: state.partner_contract_list };
    case ActType.LOAD_PARTNER_CONTRACT_LIST:
      const newContList = state.partner_contract_list.concat(action.partner_contract_list);
      return { type: action.type, supplier_list: state.supplier_list, partner_contract_list: newContList };
    case ActType.CLEAR_PARTNER_LIST:
      state.type = ActType.CLEAR_PARTNER_LIST;
      state.supplier_list = [];
      return state;
    case ActType.CLEAR_PARTNER_CONTRACT_LIST:
      state.type = ActType.CLEAR_PARTNER_CONTRACT_LIST;
      state.partner_contract_list = [];
      return state;
    default:
      return state;
  }
};

export const startLoadSupplierList = () => (dispatch: Dispatch, getState: any) => {
  const num = getState().SupplierListModule.supplier_list.length;
  ajax({ url: '/partner/list', params: { num } })
    .then((resp: any) => {
      const len = getState().SupplierListModule.supplier_list.length;
      const supplier_list = resp.map((v: any, i: number) => createSupplierRow(v, i + len));
      dispatch({ type: ActType.LOAD_SUPPLIER_LIST, supplier_list, });
    });
}

export const clearListData = () => (dispatch: Dispatch) => {
  dispatch({ type: ActType.CLEAR_PARTNER_LIST, supplier_list: [] });
}


/**
 * 取引先に紐づく契約一覧取得.
 */
export const startLoadPartnerContractList = (dataId: string) => (dispatch: Dispatch, getState: any) => {
  const num = getState().SupplierListModule.partner_contract_list.length;
  ajax({ url: `/contract/list/partner/${dataId}`, params: { num } })
    .then((resp: any) => {
      const len = getState().SupplierListModule.partner_contract_list.length;
      const staff_list = getState().StoreMasterModule.master.staff_list;
      const employee_type = getState().StoreMasterModule.master.employee_type;

      const partner_contract_list = resp.map((v: any, i: number) => {
        const staff = staff_list.find((r: any) => r.value === v.employee_id);
        if (staff) {
          const emp_type = employee_type.find((r: any) => r.value === staff.empType);
          v.employee_type = emp_type ? emp_type.label : '';
          v.employee_type_value = emp_type ? emp_type.value : '';
          v.engineer_name = staff.label || '';
        }
        return createPartnerContractRow(v, i + len);
      });
      dispatch({ type: ActType.LOAD_PARTNER_CONTRACT_LIST, partner_contract_list });
    });
}

export const clearContractListData = () => (dispatch: Dispatch) => {
  dispatch({ type: ActType.CLEAR_PARTNER_CONTRACT_LIST, partner_contract_list: [] });
}