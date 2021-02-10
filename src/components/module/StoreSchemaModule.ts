import { Action, Dispatch } from 'redux'
import ajax from '../../utils/AjaxUtil';

export enum StoreSchemaActType {
  BEFORE_INIT = '初期化前',
  INIT_SCHEMA = 'スキーマロード',
  CHANGE_SCHEMA = 'スキーマ変更',
}

export interface ISchema {
  schema: object,
  uiSchema: object,
}

export interface IStoreSchemaState {
  type: string,
  context: string,
  currentSchema: any,
  contract: { schema: any, uiSchema: any, loaded: boolean },
  employee: { schema: any, uiSchema: any, loaded: boolean },
  supplier: { schema: any, uiSchema: any, loaded: boolean },
}

const InitialState: IStoreSchemaState = {
  type: StoreSchemaActType.BEFORE_INIT,
  context: '',
  contract: { schema: {}, uiSchema: {}, loaded: false },
  employee: { schema: {}, uiSchema: {}, loaded: false },
  supplier: { schema: {}, uiSchema: {}, loaded: false },
  currentSchema(context?: string) {
    const scm = this[context || this.context] || { loaded: false };
    return scm;
  },
};

type SchemaAction = Action & {
  context: string,
  schema: any,
  uiSchema: any,
}

// reducer
export default (state = InitialState, action: SchemaAction) => {
  const nm = action.context;
  const newState = Object.assign({}, state);
  switch (action.type) {
    case StoreSchemaActType.INIT_SCHEMA:
      newState.type = action.type;
      newState.context = nm;
      newState[nm].schema = action.schema;
      newState[nm].uiSchema = action.uiSchema;
      newState[nm].loaded = true;
      return newState;
    case StoreSchemaActType.CHANGE_SCHEMA:
      newState.context = nm;
      return newState;
    default:
      return state;
  }
};

/**
 * スキーマロード.
 */
export const loadSchema = (callback?: any) => (dispatch: Dispatch, getState: any) => {
  const context = getState().StoreFormModule.context;

  if (!getState().StoreSchemaModule.currentSchema().loaded) {

    ajax({ url: `/schema/${context}` })
      .then((data: any) => {
        const { schema, uiSchema } = data;
        const action = Object.assign({}, getState().StoreSchemaModule, {
          type: StoreSchemaActType.INIT_SCHEMA, context, schema, uiSchema,
        });
        dispatch(action);
        if (callback) {
          callback();
        }
      });
  } else if (callback) {
    callback();
  }
}

/**
 * スキーマ変更.
 * 
 * @param context
 */
export const changeSchema = (context: string) => (dispatch: Dispatch, getState: any) => {
  const action = Object.assign({}, getState().StoreSchemaModule, {
    type: StoreSchemaActType.CHANGE_SCHEMA, context,
  });
  dispatch(action);
}
