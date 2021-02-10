import { Dispatch } from 'redux'
import { StoreFormActType, setContext, setMode, notifyReady } from '../../module/StoreFormModule';
import { changeData } from '../../module/StoreDataModule';
import { loadMaster } from '../../module/StoreMasterModule';
import { startLoadContract } from './ContractDataModule';
import { loadSchema, changeSchema } from '../../module/StoreSchemaModule';
import FormValidator from '../../../validator/FormValidator';
import * as equal from 'fast-deep-equal';
import * as math from 'mathjs';
import * as moment from 'moment';
import { getFormData, setFormData } from '../../../utils/FormDataUtil';
import { calcPerformanceRate, calcSalaryAmount, calcSameClientPercentFromDuration } from './ContractLogic';

export enum EmployeeType {
  NONE = 'none',
  EMP_STAFF = 'fm_emp_staff',
  EMP_BP = 'fm_emp_bp',
}

export enum ContractType {
  NONE = 'none',
  PERMANENT = 'fm_permanent',
  BP = 'fm_bp',
}

export enum SettlementType {
  NONE = 'none',
  MONTHLY = 'fm_monthly_settlement',
  DAILY = 'fm_daily_settlement',
}

export enum CalcFirstMonthType {
  NONE = 'none',
  YES = 'fm_calc_first_month_yes',
  NO = 'fm_calc_first_month_no',
}

export enum TransitionCondType {
  NONE = 'none',
  YES = 'fm_transition_cond_yes',
  NO = 'fm_transition_cond_no',
}

export enum TemporaryStuff {
  NONE = 'none',
  YES = 'fm_temporary',
  NO = 'fm_not_temporary',
}

export interface IContractFormatState {
  type: string,
  contract_type: ContractType,
  temporary_stuff: string,
  settlement: string,
  daily_calc_fm: string,
  transition_condition: string,
}

export const ContractFomratInitialState: IContractFormatState = {
  type: StoreFormActType.BEFORE_INIT,
  contract_type: ContractType.NONE,
  temporary_stuff: '',
  settlement: '',
  daily_calc_fm: '',
  transition_condition: '',
};

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
            setTimeout(() => {
              dispatch(startLoadContract(params));
            }, 20);
          }
          break;
        case StoreFormActType.INIT_CREATE:
          dispatch(changeSchema(context));
          dispatch(changeFormat());
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
  const masterData = getState().StoreMasterModule.master;
  const formatData = getState().StoreFormModule.format;

  // 社員
  if (formData.employee_contract) {
    // 控除単価計算
    const deducation_unit_price = calcDeducationUnitPrice(formData.employee_contract.contract_info);
    if (deducation_unit_price) {
      dispatch(changeData('employee_contract_contract_info_month_unit_price_info_deducation_unit_price', deducation_unit_price))
    }
    // 超過単価計算
    const excess_unit_price = calcExcessUnitPrice(formData.employee_contract.contract_info);
    if (excess_unit_price) {
      dispatch(changeData('employee_contract_contract_info_month_unit_price_info_excess_unit_price', excess_unit_price))
    }

    // 定期代からのマイナス％
    const minus_percent_from_pass_price = calcMinusPercentFromPassPrice(formData);
    if (minus_percent_from_pass_price || minus_percent_from_pass_price === 0) {
      dispatch(changeData('employee_contract_minus_percent_from_pass_price', minus_percent_from_pass_price));
    }

    // 同一顧客継続年数からの％
    const same_client_percent_from_duration = calcSameClientPercentFromDuration(formData);
    if (same_client_percent_from_duration || same_client_percent_from_duration === 0) {
      dispatch(changeData('employee_contract_same_client_percent_from_duration', same_client_percent_from_duration));
    }

    // 成果給率
    const performance_rate = calcPerformanceRate(formData, masterData);
    const transition_condition = formatData.contract.transition_condition;
    if (!transition_condition || transition_condition[0] !== TransitionCondType.YES || performance_rate) {
      dispatch(changeData('employee_contract_performance_rate', performance_rate));
    }

    // 給料額
    const salaly_amount = calcSalaryAmount(formData, performance_rate);
    dispatch(changeData('employee_contract_salary_amount', salaly_amount));

  }

  if (formData.bp_contract) {
    // 顧客
    if (formData.bp_contract.client_contract_info) {
      const info = formData.bp_contract.client_contract_info;
      // 控除単価計算
      const deducation_unit_price = calcDeducationUnitPrice(info);
      if (deducation_unit_price) {
        dispatch(changeData('bp_contract_client_contract_info_month_unit_price_info_deducation_unit_price', deducation_unit_price))
      }
      // 超過単価計算
      const excess_unit_price = calcExcessUnitPrice(info);
      if (excess_unit_price) {
        dispatch(changeData('bp_contract_client_contract_info_month_unit_price_info_excess_unit_price', excess_unit_price))
      }
    }

    // BP
    if (formData.bp_contract.bp_contract_info) {
      const info = formData.bp_contract.bp_contract_info;
      // 控除単価計算
      const deducation_unit_price = calcDeducationUnitPrice(info);
      if (deducation_unit_price) {
        dispatch(changeData('bp_contract_bp_contract_info_month_unit_price_info_deducation_unit_price', deducation_unit_price))
      }
      // 超過単価計算
      const excess_unit_price = calcExcessUnitPrice(info);
      if (excess_unit_price) {
        dispatch(changeData('bp_contract_bp_contract_info_month_unit_price_info_excess_unit_price', excess_unit_price))
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
  const masterData = getState().StoreMasterModule.master;
  const masterEmp = masterData.staff_list;

  const employee_type = changeFormat_employee(formData, masterEmp);

  if (isBpStaff(formData.employee_id, masterEmp)) {
    dispatch(changeData('contract_type', 'subcommission_contract'))
  }

  // ZAC案件名
  const zacName = calcZacProjectName(formData, masterData);
  dispatch(changeData('zac_project_title', zacName));

  const contract_type = changeFormat_contract_type(formData, masterEmp);

  let settlement;
  let settlement_client;
  let settlement_bp;
  if (formData.employee_contract) {
    settlement = changeFormat_settlement(formData.employee_contract.contract_info);
  }
  if (formData.bp_contract) {
    settlement_client = changeFormat_settlement(formData.bp_contract.client_contract_info);
    settlement_bp = changeFormat_settlement(formData.bp_contract.bp_contract_info);
  }
  const transition_condition: any = changeFormat_transition_condition(formData);
  const temporary_stuff = changeFormat_temporary_stuff(formData);


  // 成果給率
  const performance_rate = calcPerformanceRate(formData, masterData);
  if (!transition_condition || transition_condition[0] !== TransitionCondType.YES || performance_rate) {
    dispatch(changeData('employee_contract_performance_rate', performance_rate));
  }

  // 給料額
  const salaly_amount = calcSalaryAmount(formData, performance_rate);
  dispatch(changeData('employee_contract_salary_amount', salaly_amount));

  const action: any = {
    context: 'contract',
    contract_type,
    employee_type,
    settlement,
    settlement_client,
    settlement_bp,
    transition_condition,
    temporary_stuff
  }

  if (!equal(action, getState().StoreFormModule.currentFormat())) {
    action.type = StoreFormActType.CHANGE_FORMAT;
    dispatch(action);
  }
}

/**
 * アップデート前処理
 */
export const preUpdate = (callback?: any) => (dispatch: any, getState: any): any => {
  const data = getState().StoreDataModule.data;
  const schema = getState().StoreSchemaModule.contract.schema;
  const uiSchema = getState().StoreSchemaModule.contract.uiSchema;
  const format = getState().StoreFormModule.format.contract;

  // 「定期代からのマイナス％」をマイナスに寄せる
  const minus_percent_from_pass_price = getFormData('employee_contract_minus_percent_from_pass_price', data);
  if (minus_percent_from_pass_price || minus_percent_from_pass_price === 0) {
    if (!isNaN(minus_percent_from_pass_price)) {
      const minus_percent_from_pass_price_val = 0 - Math.abs(minus_percent_from_pass_price);
      setFormData('employee_contract_minus_percent_from_pass_price', minus_percent_from_pass_price_val, schema, data);
    }
  }

  // 入力チェック
  const errList = new FormValidator(schema, uiSchema, format).validate(data);

  if (callback) {
    callback(data, errList)
  }
}


/**
 * 定期代からのマイナス％
 * 
 * (※計1) 定期代 % 10,000円 = X%
 * 例) 定期代が0〜9999円はマイナス0%、10000円〜19999円はマイナス1%、20000円〜29999円はマイナス2%、etc
 * 
 * @param formData 
 */
function calcMinusPercentFromPassPrice(formData: any) {
  const pass_price = getFormData('employee_contract_commuting_info_pass_price', formData);
  if (pass_price) {
    const dat = math.chain(math.bignumber(pass_price)).divide(math.bignumber(10000)).floor().done().toString();
    return 0 - Math.abs(dat); // マイナスに寄せる
  }
  return '';
}


/**
 * ZAC案件名.
 * @param formData
 * @param masterData
 */
function calcZacProjectName(formData: any, masterData: any) {
  let zacName = '';
  if (formData.employee_id && formData.partner_id) {
    const employee = masterData.staff_list.find((r: any) => r.value === formData.employee_id);
    const prefix = ['partner_staff', 'partner_other'].indexOf(employee.empType) > -1 ? 'BP' : '';
    const employeeName = employee.label.replace('　', '').replace(' ', '');

    const row = masterData.client_list.find((r: any) => r.value === formData.partner_id);
    const partnerName = row ? row.label.replace('　', '').replace(' ', '') : '';
    zacName = `${prefix}${employeeName}/${partnerName}`;

    if (formData.start_date) {
      const stDate = moment(formData.start_date).format('YYMM');
      zacName += `/${stDate}`;
      if (formData.end_date) {
        const edDate = moment(formData.end_date).format('YYMM');
        zacName += `-${edDate}`;
      }
    }
  }
  return zacName;
}

/**
 * 控除単価計算.
 * @param info 
 */
function calcDeducationUnitPrice(info: any) {
  if (!info ||
    !info.month_unit_price_info ||
    !info.month_unit_price_info ||
    !info.month_unit_price_info.reference_time ||
    info.month_unit_price_info.deducation_unit_price) { // 控除単価に何か入ってる場合は計算しない
    return null;
  }
  const month_unit_price = info.month_unit_price_info.month_unit_price;
  const lower_limit = info.month_unit_price_info.reference_time.lower_limit;

  if (!month_unit_price ||
    !lower_limit ||
    month_unit_price === "0" ||
    lower_limit === "0") {
    return null;
  }

  return calcDivideWithTruncationLessThan10(month_unit_price, lower_limit);
}

/**
 * 超過単価計算.
 * @param info 
 */
function calcExcessUnitPrice(info: any) {
  if (!info ||
    !info.month_unit_price_info ||
    !info.month_unit_price_info ||
    !info.month_unit_price_info.reference_time ||
    info.month_unit_price_info.excess_unit_price) { // 超過単価に何か入ってる場合は計算しない
    return null;
  }
  const month_unit_price = info.month_unit_price_info.month_unit_price;
  const upper_limit = info.month_unit_price_info.reference_time.upper_limit;

  if (!month_unit_price ||
    !upper_limit ||
    month_unit_price === "0" ||
    upper_limit === "0") {
    return null;
  }

  return calcDivideWithTruncationLessThan10(month_unit_price, upper_limit);
}

/**
 * 割り算(10円未満切り捨て).
 * 
 * @param arg1
 * @param arg2 
 */
function calcDivideWithTruncationLessThan10(arg1: string, arg2: string) {
  return math.chain(math.bignumber(arg1))
    .multiply(0.1)
    .divide(math.bignumber(arg2))
    .floor()
    .multiply(10)
    .done()
    .toString();
}

/**
 * 派遣によるフォーマット変更.
 * 
 * @param formData 
 */
function changeFormat_temporary_stuff(formData: any) {
  let temporary_stuff;
  if (!formData.employee_id || !formData.contract_type) {
    temporary_stuff = [TemporaryStuff.NONE];
  } else if (['temporary_agency_contract'].indexOf(formData.contract_type) > -1) {
    temporary_stuff = [TemporaryStuff.YES];
  } else {
    temporary_stuff = [TemporaryStuff.NO];
  }
  return temporary_stuff;
}

/**
 * 移行時条件によるフォーマット変更.
 * 
 * @param formData
 */
function changeFormat_transition_condition(formData: any) {
  let transition_condition;
  if (formData.employee_contract && formData.employee_contract.transition_condition) {
    switch (formData.employee_contract.transition_condition.toString()) {
      case 'true':
        transition_condition = [TransitionCondType.YES];
        break;
      default:
        transition_condition = [TransitionCondType.NO];
    }
  }
  return transition_condition;
}

/**
 * 精算形態によるフォーマット変更
 * 
 * @param infoOb
 */
function changeFormat_settlement(infoOb: any) {
  let settlement: any[] = [];
  if (infoOb) {
    switch (infoOb.clearing_form) {
      case 'montly_liquidation':
        settlement = [SettlementType.MONTHLY];
        break;
      case 'time_settlement':
        settlement = [SettlementType.DAILY, CalcFirstMonthType.NONE];
        break;
      default:
        settlement = [SettlementType.NONE, CalcFirstMonthType.NONE];
    }

    if (infoOb.month_unit_price_info && infoOb.clearing_form === 'montly_liquidation') {
      if (infoOb.month_unit_price_info.first_month_daily_existence) {
        settlement.push(CalcFirstMonthType.YES)
      } else {
        settlement.push(CalcFirstMonthType.NO)
      }
    }
  }

  return settlement;
}

/**
 * 社員タイプによるフォーマット変更
 * 
 * @param formData 
 * @param masterEmp 
 */
function changeFormat_employee(formData: any, masterEmp: any): any[] {
  let employee_type: any[] = [];
  if (isRegularStaff(formData.employee_id, masterEmp)) {
    employee_type = [EmployeeType.EMP_STAFF]
  } else if (isBpStaff(formData.employee_id, masterEmp)) {
    employee_type = [EmployeeType.EMP_BP]
  }
  return employee_type;
}

/**
 * 契約形態によるフォーマット変更
 * 
 * @param formData 
 * @param masterEmp 
 */
function changeFormat_contract_type(formData: any, masterEmp: any) {
  let contract_type = null;

  if (!formData.employee_id || !formData.contract_type) {
    contract_type = ContractType.NONE;
  } else if (isRegularStaff(formData.employee_id, masterEmp)) {
    // 社員
    if (['temporary_agency_contract', 'subcommission_contract']
      .indexOf(formData.contract_type) > -1) {
      // 「派遣、準委任」のどれか
      contract_type = ContractType.PERMANENT;
    } else {
      contract_type = ContractType.NONE;
    }
  } else if (isBpStaff(formData.employee_id, masterEmp)) {
    // BP
    if (['subcommission_contract'].indexOf(formData.contract_type) > -1) {
      contract_type = ContractType.BP;
    } else {
      contract_type = ContractType.NONE;
    }
  }

  return [contract_type];
}

export const notifyState = (mode: string | undefined): any => (dispatch: Dispatch, getState: any) => {
  dispatch({ type: StoreFormActType.of(mode), mode });
}

function isRegularStaff(empId: string, master: any[]): boolean {
  const targetEmp = master.find(r => r.value === empId);
  return targetEmp && (['staff_engineer', 'staff_other'].indexOf(targetEmp.empType) > -1);
}

function isBpStaff(empId: string, master: any[]): boolean {
  const targetEmp = master.find(r => r.value === empId);
  return targetEmp && (['partner_staff', 'partner_other'].indexOf(targetEmp.empType) > -1);
}