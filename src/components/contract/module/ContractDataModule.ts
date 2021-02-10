import { Dispatch } from 'redux'
import { ActType } from '../../module/StoreDataModule';
import { changeFormat, changeFormatBlur, notifyState } from './ContractFormModule';
import { notifyReady } from '../../module/StoreFormModule';
import ajax from '../../../utils/AjaxUtil';

// reducer
// 当ActionCreatorModuleは、StoreDataModuleに対してdispatchします。
// Contractとしてのreducerはありません。

/**
 * 契約ロード.
 * @param contractId 
 */
export const startLoadContract = (params: any) => (dispatch: Dispatch, getState: any) => {

  if (!getState().StoreDataModule.loaded) {

    ajax({ url: `/contract/detail/${params.dataId}` })
      .then((data: any) => {
        dispatch({ type: ActType.INIT_DATA, data });
        changeFormat()(dispatch, getState);
        changeFormatBlur()(dispatch, getState);
        dispatch(notifyState(params.mode));
        notifyReady()(dispatch);
      });
  }
}

/**
 * データコピー.
 * @param callback 
 */
export const copyData = (callback?: any) => (dispatch: any, getState: any) => {
  const data = getState().StoreDataModule.data;
  delete data.contract_id;
  delete data.start_date;
  delete data.end_date;
  delete data.register_date;
  delete data.update_date;

  if (data.employee_contract && data.employee_contract.contract_info &&
    data.employee_contract.contract_info.month_unit_price_info &&
    data.employee_contract.contract_info.month_unit_price_info.first_month_daily_calculation_info) {
    delete data.employee_contract.contract_info.month_unit_price_info.first_month_daily_calculation_info;
  }
  if (data.bp_contract && data.bp_contract.client_contract_info &&
    data.bp_contract.client_contract_info.month_unit_price_info &&
    data.bp_contract.client_contract_info.month_unit_price_info.first_month_daily_calculation_info) {
    delete data.bp_contract.client_contract_info.month_unit_price_info.first_month_daily_calculation_info;
  }
  if (data.bp_contract && data.bp_contract.bp_contract_info &&
    data.bp_contract.bp_contract_info.month_unit_price_info &&
    data.bp_contract.bp_contract_info.month_unit_price_info.first_month_daily_calculation_info) {
    delete data.bp_contract.bp_contract_info.month_unit_price_info.first_month_daily_calculation_info;
  }
  dispatch({ type: ActType.COPY_STORE_DATA, data });
  if (callback) {
    setTimeout(callback, 10);
  }
}

/**
 * データ削除.
 */
export const deleteData = (dataId: any, callback?: any) => (dispatch: any, getState: any) => {
  ajax({ url: `/contract/delete/${dataId}`, method: 'delete' })
    .then((data: any) => {

      if (callback) {
        callback();
      }
    });
}