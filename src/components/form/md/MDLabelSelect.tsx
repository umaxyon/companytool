import * as React from 'react';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import MDLabel from './MDLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { WidgetProps } from 'react-jsonschema-form'
import { IReduxState } from '../../../store';
import { IStoreMasterState } from '../../module/StoreMasterModule';
import { IStoreDataState } from '../../module/StoreDataModule';
import { getFormData } from '../../../utils/FormDataUtil';
import { IStoreFormState } from '../../module/StoreFormModule';
import MDErrorLabel from './MDErrorLabel';

interface IMDLabelSelect extends WidgetProps {
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

class MDLabelSelect extends React.Component<IMDLabelSelect, any> {
    constructor(props: any) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.getOptions = this.getOptions.bind(this);
        this.getError = this.getError.bind(this);
    }

    public render() {
        const val = getFormData(this.props.id, this.props.storeData.data);
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
        const err = this.getError();

        return (
            <div style={{ width: '95%' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', padding: '8px 0 8px 0' }}>
                    <div style={{
                        gridColumn: '1',
                        display: 'flex',
                        alignItems: 'center',
                        color: 'rgba(0, 0, 0, 0.6)',
                        fontSize: '15px',
                        width: '100%'
                    }}>{label}</div>
                    <div style={{ gridColumn: '2' }}>
                        <Select
                            error={!!err}
                            name={name}
                            style={{ minWidth: '160px', fontSize: '12px' }}
                            onChange={this.onChange}
                            onBlur={this.onBlur}
                            value={val}>
                            {this.makeOptions(ops, name)}
                        </Select>
                    </div>
                </div>
                <MDErrorLabel error={err} />
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

    private makeOptions(ops: any[], key: string): React.ReactNode[] {
        const list: React.ReactNode[] = [<MenuItem key={key + "_none"} value="" />];
        ops.forEach((v, i) => {
            list.push(<MenuItem key={key + i} value={v.value}>{v.label}</MenuItem>)
        })
        return list;
    }

    private onChange(e: any) {
        this.props.onChange({ id: this.props.id, val: e.target.value, eventChangeOn: true });
    }

    private onBlur(e: any) {
        this.props.onBlur({ id: this.props.id, val: e.target.value });
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
    storeMaster: state.StoreMasterModule,
    storeData: state.StoreDataModule,
});
export default connect(mapStateToProps)(MDLabelSelect);