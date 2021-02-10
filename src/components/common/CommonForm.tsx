import * as React from 'react';
import { connect } from 'react-redux';
import MDLabelText from '../form/md/MDLabelText';
import MDLabelCheckbox from '../form/md/MDLabelCheckbox';
import MDLabelSelect from '../form/md/MDLabelSelect';
import { withRouter } from 'react-router'
import CustomFieldTemplate from '../form/CustomFieldTemplate';
import GridLayoutTemplate from '../form/GridLayoutTemplate';
import CustomForm from '../form/CustomForm';
import { changeData, clearData } from '../module/StoreDataModule';
import ScrollDiv from '../../utils/ScrollDiv';
import { notifyNotReady, notifyInputError, setMode } from '../module/StoreFormModule';
import MDIndicator from '../form/md/MDIndicator';


const widgets = {
  "TextWidget": MDLabelText,
  "CheckboxWidget": MDLabelCheckbox,
  "SelectWidget": MDLabelSelect,
}

interface ICommonFormProps {
  changeData: any,
  clearData: any,
  clearMode: any,
  clearError: any,
  changeFormat: any,
  changeFormatBlur: any,
  notifyNotReady: any,
  onChange: any,
  onChangeBlur: any,
  storeSchema: {
    schema: object,
    uiSchema: object,
  },
  router: any,
  match: any,
  path: string,
  ready: boolean,
  size: { h: number, w: number },
}

class CommonForm extends React.Component<ICommonFormProps, any> {

  constructor(props: any) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeBlur = this.handleChangeBlur.bind(this);
  }

  public handleChange(formData: any) {
    this.props.changeData(formData.id, formData.val);
    if (formData.eventChangeOn) {
      this.props.changeFormat(formData.id);
    }
  }

  public handleChangeBlur(formData: any) {
    this.props.changeFormatBlur(formData.id);
  }

  public componentWillUnmount() {
    this.props.notifyNotReady();
    this.props.clearError();
    this.props.clearData();
    this.props.clearMode();
  }

  public render() {
    return (
      (this.props.ready) ?
        <ScrollDiv height={(this.props.size.h - 135)}>
          <div>
            <CustomForm
              schema={this.props.storeSchema.schema}
              uiSchema={this.props.storeSchema.uiSchema}
              widgets={widgets}
              FieldTemplate={CustomFieldTemplate}
              ObjectFieldTemplate={GridLayoutTemplate}
              onChange={this.handleChange}
              onBlur={this.handleChangeBlur}>
              <div />
            </CustomForm>
          </div>
        </ScrollDiv>
        : <MDIndicator />
    )
  }
};

const mapStateToProps = (state: any) => ({
  path: state.router.location.pathname,
  storeSchema: state.StoreSchemaModule.currentSchema(),
  ready: state.StoreFormModule.ready,
  size: state.GlobalEventModule.size,
});
const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  changeData: (id: string, val: any) => {
    dispatch(changeData(id, val));
  },
  changeFormat: (targetId: string) => dispatch(ownProps.onChange(targetId)),
  changeFormatBlur: (targetId: string) => dispatch(ownProps.onChangeBlur(targetId)),
  notifyNotReady: () => dispatch(notifyNotReady()),
  clearData: () => dispatch(clearData()),
  clearMode: () => dispatch(setMode('')),
  clearError: () => dispatch(notifyInputError([])),
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CommonForm));
