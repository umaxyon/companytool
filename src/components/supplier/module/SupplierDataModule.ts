import { Dispatch } from 'redux'
import { ActType } from '../../module/StoreDataModule';
import { changeFormat, changeFormatBlur, notifyState } from './SupplierFormModule';
import { notifyReady } from '../../module/StoreFormModule';
import ajax from '../../../utils/AjaxUtil';

// reducer
// 当ActionCreatorModuleは、StoreDataModuleに対してdispatchします。
// Contractとしてのreducerはありません。

/**
 * 社員ロード.
 */
export const startLoadSupplier = (params: any) => (dispatch: Dispatch, getState: any) => {

  if (!getState().StoreDataModule.loaded) {

    ajax({ url: `/partner/detail/${params.dataId}`, })
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
 * データ削除.
 */
export const deleteData = (dataId: any, callback?: any) => (dispatch: any, getState: any) => {
  ajax({ url: `/partner/delete/${dataId}`, method: 'delete', })
    .then((data: any) => {

      if (callback) {
        callback();
      }
    });
}