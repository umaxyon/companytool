
import { findSchema, findUiSchema } from '../utils/SchemaUtil';
import { getFormData } from '../utils/FormDataUtil';
import RequiredValidator from './RequiredValidator';

export interface IValidateParam {
  data: any,
}

export interface IValidateResult {
  key: string,
  msg: string,
}

export interface IValidator {
  validate: (param: IValidateParam) => void,
}

export default class FormValidator {
  private errorList: IValidateResult[] = [];
  private validators: IValidator[] = [];

  constructor(
    public schema: any,
    public uiSchema: any, 
    public format: any,
    customValidators?: IValidator[] ) {
    
    this.validators.push(new RequiredValidator(this));

    if (customValidators) {
      this.validators = this.validators.concat(customValidators);
    }
  }

  public validate(data: any) {
    for (const validator of this.validators){
      validator.validate({ data });
    }
    return this.errorList;
  }

  public getFormData(key: string, data: any) {
    return getFormData(key.split('.').join('_'), data);
  }

  public addError(key: string, msg: string) {
    this.errorList.push({ key: key.split('.').join('_'), msg, })
  }

  public resolveName(key: string) {
    const currentSchema = findSchema(this.schema, key);
    const currentUiSchema = findUiSchema(this.uiSchema, key);
    return currentUiSchema['ui:label'] || currentSchema.title;
  }
}