import * as React from 'react';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MDLabel from './MDLabel';
import { connect } from 'react-redux';
import { IReduxState } from '../../../store';
import { WidgetProps } from 'react-jsonschema-form'
import { getFormData } from '../../../utils/FormDataUtil';
import { IStoreFormState } from '../../module/StoreFormModule';
import { IStoreDataState } from '../../module/StoreDataModule';
import MDErrorLabel from './MDErrorLabel';

interface IMDLabelCheckbox extends WidgetProps {
    mode?: string,
    label: string,
    name: string,
    uiSchema: any,
    idSchema: any,
    formData: any,
    registry: any,
    storeForm: IStoreFormState,
    storeData: IStoreDataState,
    eventChangeOn?: boolean,
    eventBlurOn?: boolean,
    dispatch: any,
}

class MDLabelCheckbox extends React.Component<IMDLabelCheckbox, any> {
    constructor(props: any) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.getError = this.getError.bind(this);
    }

    public render() {
        let content = null;
        const val = getFormData(this.props.id, this.props.storeData.data);
        const mode = this.props.storeForm.mode;
        switch (mode) {
            case 'detail':
                content = this.label(val); break;
            case 'create':
            case 'edit':
            default:
                content = this.input(val);
        }
        return content;
    }

    private label(val: string) {
        const { label } = this.props;
        const on = this.props.uiSchema['ui:label_on'] || '済';
        return <MDLabel label={label} value={val ? on : '　'} />
    }

    private input(val: string) {
        const { label } = this.props;
        const checked = val ? 'checked' : '';
        const value = val || '';
        const err = this.getError();
        return (
            <div style={{ width: '95%'}}>
                <div style={{ display: 'flex' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        paddingRight: '20px',
                        color: 'rgba(0, 0, 0, 0.6)',
                        fontSize: '15px',
                        whiteSpace: 'nowrap',
                    }}>{label}</div>
                    <div style={{ display: 'flex' }}>
                        <Checkbox
                            style={{ marginLeft: '-20px' }}
                            checked={checked}
                            onChange={this.onChange}
                            value={value.toString()}
                            color="primary" />
                    </div>
                </div>
                <MDErrorLabel error={err} />
            </div>
        )
    }

    private onChange(e: any) {
        const val = !e.target.value ? 'true' : '';
        this.props.onChange({ id: this.props.id, val, eventChangeOn: true });
    }

    private getError() {
        const errList = this.props.storeForm.errList;
        const id = this.props.id.replace(/^root_/, '');
        const err = errList.find((e: any) => e.key === id);
        return err;
    }

}

const mapStateToProps = (state: IReduxState) => ({
    storeForm: state.StoreFormModule,
    storeData: state.StoreDataModule,
});
export default connect(mapStateToProps)(MDLabelCheckbox);