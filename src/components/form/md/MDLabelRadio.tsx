import * as React from 'react';
import { connect } from 'react-redux';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MDLabel from './MDLabel';
import { WidgetProps } from 'react-jsonschema-form'
import { IReduxState } from '../../../store';
import { IStoreMasterState } from '../../module/StoreMasterModule';
import { IStoreDataState } from '../../module/StoreDataModule';
import { getFormData } from '../../../utils/FormDataUtil';
import { IStoreFormState } from '../../module/StoreFormModule';

interface IMDLabelRadio extends WidgetProps {
    mode?: string,
    label: string,
    name: string,
    uiSchema: any,
    idSchema: any,
    formData: any,
    registry: any,
    onBlur: any,
    storeForm: IStoreFormState
    storeMaster: IStoreMasterState,
    storeData: IStoreDataState,
    eventChangeOn?: boolean,
    eventBlurOn?: boolean,
    dispatch: any,
}

class MDLabelRadio extends React.Component<IMDLabelRadio, any> {
    constructor(props: any) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.getOptions = this.getOptions.bind(this);
    }

    public render() {
        const v = getFormData(this.props.id, this.props.storeData.data);
        const val = v === undefined ? '' : v.toString();

        const mode = this.props.storeForm.mode;
        const nm = this.props.uiSchema['ui:classname'];
        const condition = this.props.uiSchema['ui:condition'];
        const labelTarget = this.props.storeForm.currentFormat()[condition];

        let content = null;
        if (nm && labelTarget && labelTarget.indexOf(nm) > -1) {
            content = this.label(val);
        } else {
            switch (mode) {
                case 'detail':
                    content = this.label(val); break;
                case 'create':
                case 'edit':
                default:
                    content = this.input(val);
            }
        }

        return content;
    }

    private label(val: string) {
        const { label } = this.props;
        const dat = this.getOptions().find(r => r.value === val);
        return <MDLabel label={label} value={dat ? dat.label : '　'} />
    }

    private input(val: string) {
        const { label } = this.props;
        const ops = this.getOptions();

        return (
            <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', width: '95%', padding: '8px 0 8px 0' }}>
                <div style={{
                    gridColumn: '1',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'rgba(0, 0, 0, 0.6)',
                    fontSize: '15px',
                    width: '100%'
                }}>{label}</div>
                <div style={{ gridColumn: '2' }}>
                    <RadioGroup
                        name={name}
                        value={val}
                        onChange={this.onChange}
                        row={true}>
                        {this.makeRadios(ops, name)}
                    </RadioGroup>
                </div>
            </div>
        )
    }

    private getOptions(): any[] {
        const masterKey = this.props.uiSchema["ss:master"] || this.props.schema["ss:master"];
        if (masterKey) {
            return this.props.storeMaster.master[masterKey];
        } else {
            const options: any = this.props.options;
            return options.enumOptions;
        }
    }

    private makeRadios(ops: any[], key: string): React.ReactNode[] {
        const list: React.ReactNode[] = [];
        ops.forEach((v, i) => {
            list.push(
                <FormControlLabel
                    key={`rd_${key}_${i}_${v.value}`}
                    value={v.value}
                    label={v.label}
                    control={
                        <Radio
                            icon={<RadioButtonUncheckedIcon fontSize="small" />}
                            checkedIcon={<RadioButtonCheckedIcon fontSize="small" />} />
                    } />
            )
        })
        return list;
    }

    private onChange(e: any) {
        this.props.onChange({ id: this.props.id, val: e.target.value, eventChangeOn: true });
    }

    private onBlur(e: any) {
        this.props.onBlur({ id: this.props.id, val: e.target.value });
    }
}
const mapStateToProps = (state: IReduxState) => ({
    storeForm: state.StoreFormModule,
    storeMaster: state.StoreMasterModule,
    storeData: state.StoreDataModule,
});
export default connect(mapStateToProps)(MDLabelRadio);