import { Dispatch } from 'redux'
import { ActType } from '../../module/StoreDataModule';
import { changeFormat, changeFormatBlur, notifyState } from './EmployeeFormModule';
import { notifyReady } from '../../module/StoreFormModule';
import ajax from '../../../utils/AjaxUtil';

// reducer
// 当ActionCreatorModuleは、StoreDataModuleに対してdispatchします。
// Contractとしてのreducerはありません。

/**
 * 社員ロード.
 */
export const startLoadEmployee = (params: any) => (dispatch: Dispatch, getState: any) => {

  if (!getState().StoreDataModule.loaded) {

    ajax({ url: `/employee/detail/${params.dataId}` })
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
  ajax({ url: `/employee/delete/${dataId}`, method: 'delete' })
    .then((data: any) => {
      if (callback) {
        callback();
      }
    });
}
