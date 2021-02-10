import * as React from 'react';
import MDText from './MDText';
import MDLabel from './MDLabel';
import { connect } from 'react-redux';
import { WidgetProps } from 'react-jsonschema-form';
import { IReduxState } from '../../../store';
import { IStoreDataState } from '../../module/StoreDataModule';
import { IStoreFormState } from '../../module/StoreFormModule';
import { getFormData } from '../../../utils/FormDataUtil';
import * as moment from 'moment';
import MDErrorLabel from './MDErrorLabel';

// import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
// import MomentUtils from "@date-io/moment";
// const moment = require('moment');
// moment.locale('ja');

interface IMDLabelTextProps extends WidgetProps {
  mode?: string,
  label?: string,
  value: string,
  name: string,
  uiSchema: any,
  schema: any,
  idSchema: any,
  formData: any,
  registry: any,
  storeForm: IStoreFormState,
  storeData: IStoreDataState,
  onBlur: any,
  eventChangeOn?: boolean,
  eventBlurOn?: boolean,
  dispatch: any,
  getFormatString?: any,
}
class MDLabelText extends React.Component<IMDLabelTextProps, any> {
  constructor(props: any) {
    super(props);
    this.getError = this.getError.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  public render() {
    let content = null;
    const val = getFormData(this.props.id, this.props.storeData.data);
    const mode = this.props.storeForm.mode;
    const nm = this.props.uiSchema['ui:classname'];
    const condition = this.props.uiSchema['ui:condition'];
    const labelTarget = this.props.storeForm.currentFormat()[condition];

    if (nm && condition &&
      ((labelTarget && labelTarget.indexOf(nm) > -1) || !labelTarget)) {
      content = this.label(val, mode);
    } else {
      switch (mode) {
        case 'detail':
          content = this.label(val); break;
        case 'create':
        case 'edit':
        default:
          content = this.input(val, mode);
      }
    }
    return content;
  }

  private label(val: string, mode?: string) {
    const { label } = this.props;
    const type = this.props.schema['ss:type'] || 'text';
    const dateFmt = this.props.uiSchema['ui:dateformat'];
    let value = val;
    if (dateFmt && val) {
      value = moment(val).format(dateFmt)
    }

    let err;
    if (mode !== 'detail') {
      err = this.getError();
    }

    return (
      <div style={{width: '95%'}}>
        <MDLabel label={label} value={value || '　'} type={type} />
        <MDErrorLabel error={err} />
      </div>
    );
  }

  private input(val: string, mode: string) {
    const disableEdit = this.props.uiSchema['ui:disable_edit'];
    if (disableEdit) {
      return <React.Fragment />
    }

    const { label, style } = this.props;
    const strLabel: string = ('string' === typeof label) ? label : '';
    let type;
    switch(this.props.schema.type) {
      case 'integer': type = 'number'; break;
      case 'string': type = 'text'; break;
      case 'date': type = 'date'; break;
      default: type = this.props.schema.type || 'text';
    }
    const width = this.props.schema['ss:width'] || '';

    const err = (mode !== 'detail') ? this.getError() : null;

    let content;
    content = (
      <MDText
        error={!!err}
        type={type}
        width={width}
        style={style || {}}
        label={strLabel}
        value={val}
        onChange={this.onChange}
        onBlur={this.onBlur} />
    )
    const grid2Style: any = { gridColumn: '2', };
    return (
      <div style={{ width: '95%'}}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '200px 1fr',
        }}>
          <div style={{
            gridColumn: '1',
            display: 'flex',
            alignItems: 'center',
            color: 'rgba(0, 0, 0, 0.6)',
            fontSize: '15px'
          }}>{label}</div>
          <div style={grid2Style}>{content}</div>
        </div>
        <MDErrorLabel error={err} />
      </div>
    )
  }

  private getError() {
    const errList = this.props.storeForm.errList;
    const id = this.props.id.replace(/^root_/, '');
    const err = errList.find((e: any) => e.key === id);
    return err;
  }

  private onChange(e: any) {
    this.props.onChange({ id: this.props.id, val: e.target.value, eventChangeOn: this.props.eventChangeOn });
  }
  private onBlur(e: any) {
    if (this.props.eventBlurOn) {
      this.props.onBlur({ id: this.props.id, val: e.target.value });
    }
  }
}

const mapStateToProps = (state: IReduxState) => ({
  storeForm: state.StoreFormModule,
  storeData: state.StoreDataModule,
});
export default connect(mapStateToProps)(MDLabelText);