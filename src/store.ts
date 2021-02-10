import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import createBrowserHistory from 'history/createBrowserHistory';
import { composeWithDevTools } from 'redux-devtools-extension';
import StoreCommonModule, { IStoreCommonState } from './components/module/StoreCommonModule';
import StoreDataModule, { IStoreDataState } from './components/module/StoreDataModule';
import StoreMasterModule, { IStoreMasterState } from './components/module/StoreMasterModule';
import StoreFormModule, { IStoreFormState } from './components/module/StoreFormModule';
import StoreSchemaModule, { IStoreSchemaState } from './components/module/StoreSchemaModule';
import ContractListModule, { IContractListState } from './components/contract/module/ContractListModule';
import EmployeeListModule, { IEmployeeListState } from './components/employee/module/EmployeeListModule';
import SupplierListModule, { ISupplierListState } from './components/supplier/module/SupplierListModule';
import AuthModule, { IAuthState } from './components/auth/module/AuthModule';
import GlobalEventModule, { IGlobalEventState } from './module/GlobalEventModule';

export const history = createBrowserHistory();

export default createStore(
  combineReducers({
    router: connectRouter(history),
    StoreCommonModule,
    StoreDataModule,
    StoreMasterModule,
    StoreFormModule,
    StoreSchemaModule,
    ContractListModule,
    EmployeeListModule,
    SupplierListModule,
    AuthModule,
    GlobalEventModule,
  }),
  composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk)),
)

export interface IReduxState {
  StoreCommonModule: IStoreCommonState,
  StoreDataModule: IStoreDataState,
  StoreMasterModule: IStoreMasterState,
  StoreFormModule: IStoreFormState,
  StoreSchemaModule: IStoreSchemaState,
  ContractListModule: IContractListState,
  EmployeeListModule: IEmployeeListState,
  SupplierListModule: ISupplierListState,
  AuthModule: IAuthState,
  GlobalEventModule: IGlobalEventState,
}