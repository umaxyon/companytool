import * as React from 'react'
import Form from 'react-jsonschema-form';
import customHOC from '../../utils/CustomHOC';


class CustomForm<T> extends Form<T> {
    public render(): React.ReactNode {
        const form: any = super.render();
        const children: any = form.props.children;

        if (children) {
            const reg = children[1].props.registry;
            const uiSchema = children[1].props.uiSchema;
            const props: any = this.props;
            uiSchema['ui:reg'] = reg;
            uiSchema['ui:event'] = {
                onChange: props.onChange,
                onBlur: props.onBlur,
            }
            uiSchema['ss:opt'] = {
                mode: this.mode(props),
            }
        }

        return form;
    }

    private mode(props: any) {
        return window.location.href.split('/')[4];
    }
}

export default customHOC(CustomForm);