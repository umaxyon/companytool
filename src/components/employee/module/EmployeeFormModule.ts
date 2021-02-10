import { Dispatch } from 'redux'
import { StoreFormActType, setContext, setMode, notifyReady } from '../../module/StoreFormModule';
import { changeData } from '../../module/StoreDataModule';
import { loadMaster } from '../../module/StoreMasterModule';
import { startLoadEmployee } from './EmployeeDataModule';
import { loadSchema } from '../../module/StoreSchemaModule';
import { getFormData } from '../../../utils/FormDataUtil';
import * as equal from 'fast-deep-equal';
import * as moment from 'moment';

export enum Retirement {
  NONE = 'none',
  YES = 'fm_retirement',
  NO = 'fm_not_retirement',
}

export enum EmployeeType {
  NONE = 'none',
  STAFF = 'fm_emp_staff',
  BP = 'fm_emp_bp',
}

// reducer
// 当ActionCreatorModuleは、StoreFormModuleに対し、
// context='contract'としてdispatchします。
// Contractとしてのreducerはありません。

export interface IParams {
  mode: string | undefined,
  dataId: string | undefined,
}
/**
 * 初期化Action
 */
export const startInitialize = (params: IParams, context: string) => (dispatch: any, getState: any) => {
  const formModule = getState().StoreFormModule;
  if (formModule.isChangeContext(context)) {
    dispatch(setContext(context));
  }
  if (formModule.isChangeMode(params.mode)) {
    dispatch(setMode(params.mode));
  }
  dispatch(loadMaster(() => {
    dispatch(loadSchema(() => {
      const type = StoreFormActType.of(params.mode);
      switch (type) {
        case StoreFormActType.INIT_EDIT:
        case StoreFormActType.INIT_DETAIL:
          if (params.dataId) {
            dispatch(startLoadEmployee(params));
          }
          break;
        case StoreFormActType.INIT_CREATE:
          dispatch(changeFormat());
          dispatch(changeFormatBlur());
          dispatch(notifyState(params.mode));
          dispatch(notifyReady());
          break;
        default:
      }
    }));
  }));
}

/**
 * フォーマット変更(Blur).
 * @param targetId
 */
export const changeFormatBlur = (targetId?: string) => (dispatch: any, getState: any) => {
  const formData = getState().StoreDataModule.data;

  // 入社日
  if (formData.staff_info) {
    if (formData.staff_info.hire_date) {
      const company_history = calcCompanyHistory(formData.staff_info.hire_date);
      if (company_history) {
        dispatch(changeData('staff_info_company_history', company_history))
      }
    }

    // 年齢
    if (formData.staff_info.birthday) {
      const age = calcAge(formData.staff_info.birthday);
      if (age) {
        dispatch(changeData('partner_info_age', age))
      }
    }
  }
}

/**
 * フォーマット変更.
 * @param targetId
 */
export const changeFormat = (targetId?: string) => (dispatch: any, getState: any): any => {
  const formData = getState().StoreDataModule.data;
  const employee_type = changeFormat_employee_type(formData);

  const action: any = {
    context: 'employee',
    employee_type,
  }

  if (!equal(action, getState().StoreFormModule.currentFormat())) {

    if (employee_type.find((v: any) => v === EmployeeType.BP)) {
      const contract_target = getFormData('partner_info_contract_target', formData);
      if (contract_target === '') {
        dispatch(changeData('partner_info_contract_target', 'true'));
      }
    }

    action.type = StoreFormActType.CHANGE_FORMAT;
    dispatch(action);
  }
}


/**
 * 社員種別によるフォーマット変更.
 * 
 * @param formData 
 */
function changeFormat_employee_type(formData: any) {
  let empType = [EmployeeType.NONE];
  switch (formData.employee_type) {
    case 'staff_engineer':
    case 'staff_other':
      empType = [EmployeeType.STAFF]; break;
    case 'partner_staff':
    case 'partner_other':
      empType = [EmployeeType.BP]; break;
  }
  return empType;
}

/**
 * 年齢計算.
 * @param birthday
 */
function calcAge(birthday: string) {
  moment.locale('ja');
  const age = moment().diff(moment(birthday), 'year');
  return age + '歳';
}

/**
 * 社歴計算.
 * 
 * @param hire_date
 */
function calcCompanyHistory(hire_date: string) {
  moment.locale('ja');
  const month_diff = moment().diff(moment(hire_date), 'month');
  if (month_diff >= 12) {
    const y = Math.floor(month_diff / 12);
    const m = Math.floor(month_diff % 12);
    return y + '年' + m + 'ヵ月';
  } else {
    return month_diff + 'ヵ月';
  }
  return
}

export const notifyState = (mode: string | undefined): any => (dispatch: Dispatch, getState: any) => {
  dispatch({ type: StoreFormActType.of(mode), mode });
}

/**
 * アップデート前処理
 */
export const preUpdate = (callback?: any) => (dispatch: any, getState: any): any => {
  const data = getState().StoreDataModule.data;

  if (callback) {
    callback(data)
  }
}