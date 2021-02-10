import FormValidator, { IValidator, IValidateParam } from './FormValidator';

export default class RequiredValidator implements IValidator {
  constructor(private validator: FormValidator) {
  }

  public validate(param: IValidateParam) {
    const { data } = param;
    if (this.validator.schema.required) {
      this.validator.schema.required
        .flatMap((r: any) => this.isTarget(r) ? r.keys : [] )
        .forEach((key: string) => {
          const target = this.validator.getFormData(key, data);
          if (target === undefined || target === '') {
            const name = this.validator.resolveName(key);
            this.validator.addError(key, `${name}は必須です。`);
          }
        });
    }
  }

  private isTarget(requireDef: any) {
    if (!requireDef.condition) {
      return true;
    }
    const condState = this.validator.format[requireDef.condition];
    if (typeof condState === 'string') {
      return condState === requireDef.format;
    } else {
      return !!condState.find((r: string) => r === requireDef.format);
    }
  }
}
