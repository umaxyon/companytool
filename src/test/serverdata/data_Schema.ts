import data_ContractSchema from './data_ContractSchema';
import data_EmployeeSchema from './data_EmployeeSchema';
import data_SupplierSchema from './data_SupplierSchema';

export default (param: any) => {
  switch (param.context) {
    case 'contract':
      return data_ContractSchema(param);
    case 'employee':
      return data_EmployeeSchema(param);
    case 'supplier':
      return data_SupplierSchema(param);
    default:
      return {};
  }
}