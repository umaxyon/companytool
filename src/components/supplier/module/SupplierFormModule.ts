import { Dispatch } from 'redux'
import { StoreFormActType, setContext, setMode, notifyReady } from '../../module/StoreFormModule';
import { loadMaster } from '../../module/StoreMasterModule';
import { startLoadSupplier } from './SupplierDataModule';

import { loadSchema } from '../../module/StoreSchemaModule';
import * as equal from 'fast-deep-equal';

export enum Address {
  NONE = 'none',
  YES = 'fm_address',
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
            dispatch(startLoadSupplier(params));
          }
          break;
        case StoreFormActType.INIT_CREATE:
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
  console.log('supplier format blur');
}

/**
 * フォーマット変更.
 * @param targetId
 */
export const changeFormat = (targetId?: string) => (dispatch: any, getState: any): any => {

  const address = [Address.YES];

  const action: any = {
    context: 'supplier',
    address,
  }

  if (!equal(action, getState().StoreFormModule.currentFormat())) {
    action.type = StoreFormActType.CHANGE_FORMAT;
    dispatch(action);
  }
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
