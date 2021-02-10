import * as React from "react";
import { JSONSchema6 } from 'json-schema';
import { ObjectFieldTemplateProps } from 'react-jsonschema-form';
import { TwoRow, SingleRow } from '../../utils/RowGridUtil';
import { Grid } from '@material-ui/core';
import CustomCard from './CustomCard';
import MDExpansionPanel from './md/MDExpansionPanel';
import MDLabelText from './md/MDLabelText';
import MDLabelSelect from './md/MDLabelSelect';
import MDLabelRadio from './md/MDLabelRadio';
import EmployeeFormFooter from '../employee/EmployeeFormFooter';
import EmployeeContractList from '../employee/EmployeeContractList';
import SupplierFormFooter from '../supplier/SupplierFormFooter';
import PartnerContractList from '../supplier/PartnerContractList';
import ContractFormFooter from '../contract/ContractFormFooter';
import MDLabelCheckbox from './md/MDLabelCheckbox';
import CustomDescription from './CustomDescription';
import { findSchema, findUiSchema } from '../../utils/SchemaUtil';
const { retrieveSchema } = require('../../../node_modules/react-jsonschema-form/lib/utils');


function renderChildren(childrenLayoutGridSchema: JSONSchema6[], props: any, isGroup?: boolean): React.ReactNode {
  const { definitions } = props.uiSchema['ui:reg'];
  const schema = retrieveSchema(props.schema, definitions);

  return childrenLayoutGridSchema.map((layoutGridSchema: JSONSchema6, index: number) => {
    const content = <CustomObjectFieldTemplate {...props} key={index} schema={schema} layoutGridSchema={layoutGridSchema} />
    if (isGroup && childrenLayoutGridSchema.length - 1 === index) {
      return (
        <SingleRow key={`grp${index}`} groupPaddingBottom={"5px"}>
          {content}
        </SingleRow>
      );
    }
    return content;
  });
};

function renderTitle(group: string, props: any) {
  const title = group && typeof group === 'string' ? group : null;
  return (<SingleRow dense={true}>
    <div style={{
      marginTop: '15px',
      marginBottom: "-2px",
      paddingBottom: "1px",
      fontSize: '15px',
      fontWeight: 'bold',
    }}>
      {title}
    </div>
  </SingleRow>)
}

function renderRow(layoutGridSchema: JSONSchema6, props: any) {
  const rows = layoutGridSchema['ui:row'];
  const group = layoutGridSchema['ui:group'];
  const card = layoutGridSchema['ui:card'];
  const expansion = layoutGridSchema['ui:expand'];
  const disabled = layoutGridSchema['ui:disabled'];
  const className = layoutGridSchema['ui:classname'];
  const condition = layoutGridSchema['ui:condition'];
  const appearMode = layoutGridSchema['ui:appear_mode'];
  const children = renderChildren(rows, props);
  const row = rows.length === 2 ? <TwoRow dense={true}>{children}</TwoRow> : <SingleRow dense={true}>{children}</SingleRow>;

  const contents = group ?
    (
      <React.Fragment>
        {renderTitle(group, props)}
        {row}
      </React.Fragment>
    ) : row;

  if (card) {
    return (
      <CustomCard style={{ marginTop: '10px' }} className={className} condition={condition} disabled={disabled} appearMode={appearMode}>{contents}</CustomCard>
    );
  } else if (expansion) {
    return (
      <SingleRow dense={true}>
        <MDExpansionPanel className={className} condition={condition}>{contents}</MDExpansionPanel>
      </SingleRow>
    );
  } else {
    return contents;
  }
}

function renderCol(layoutGridSchema: JSONSchema6, props: any) {
  const { children } = layoutGridSchema['ui:col'];
  const group = layoutGridSchema['ui:group'];

  if (group) {
    return (
      <SingleRow dense={true}>
        {renderTitle(group, props)}
        {renderChildren(children, props, true)}
      </SingleRow>
    );
  } else {
    return <React.Fragment>{renderChildren(children, props)}</React.Fragment>;
  }
}

function renderField(layoutGridSchema: any, props: any) {
  const {
    uiSchema,
    // errorSchema,
    idSchema,
    disabled,
    readonly,
    onFocus,
    formData
  } = props;
  const reg = uiSchema['ui:reg'];
  const event = uiSchema['ui:event'];
  const { definitions, fields } = reg;
  const { SchemaField } = fields;
  definitionsExpansion(definitions);
  const schema = replaceDefinition(props.schema, definitions);
  const nameList = layoutGridSchema.split('.');
  const name = nameList[nameList.length - 1];
  const scm = findSchema(schema, layoutGridSchema);
  const uiScm = findUiSchema(uiSchema, layoutGridSchema);
  const mode = uiSchema['ss:opt'].mode;

  if (scm) {
    const onChange = (targetVal: any) => {
      event.onChange(targetVal);
    }
    const onBlur = (targetVal: any) => {
      event.onBlur(targetVal);
    }
    const isc = getIdSchema(idSchema, nameList);

    let contents;
    const label = uiScm['ui:label'] || scm.title;
    const blur = !!uiScm['ui:blur'];
    const change = !!uiScm['ui:change'];
    const type: any = scm.type;
    if((!!['string', 'integer', 'date'].find((v:string) => v === type)) || type.startsWith('textarea')) {
    // if (type === 'string') {
      if (!scm.hasOwnProperty('enum')) {
        contents = (
          <MDLabelText
            id={isc.$id}
            key={isc.$id}
            label={label}
            value={''}
            required={false}
            autofocus={false}
            options={{}}
            name={name}
            schema={scm}
            uiSchema={uiScm}
            idSchema={isc}
            formData={formData[name]}
            formContext={undefined}
            onChange={onChange}
            onBlur={onBlur}
            eventBlurOn={blur}
            eventChangeOn={change}
            onFocus={onFocus}
            registry={reg}
            disabled={disabled}
            readonly={readonly}
          />
        )
      } else {
        if (scm['ss:radio']) {
          contents = (
            <MDLabelRadio
              id={isc.$id}
              key={isc.$id}
              label={label}
              value={''}
              required={false}
              autofocus={false}
              options={{}}
              name={name}
              schema={scm}
              uiSchema={uiScm}
              idSchema={isc}
              formData={formData[name]}
              formContext={undefined}
              onChange={onChange}
              onBlur={onBlur}
              eventBlurOn={blur}
              onFocus={onFocus}
              registry={reg}
              disabled={disabled}
              readonly={readonly}
            />
          )
        } else {
          contents = (
            <MDLabelSelect
              id={isc.$id}
              key={isc.$id}
              label={label}
              value={''}
              required={false}
              autofocus={false}
              options={{}}
              name={name}
              schema={scm}
              uiSchema={uiScm}
              idSchema={isc}
              formData={formData[name]}
              formContext={undefined}
              onChange={onChange}
              onBlur={onBlur}
              eventBlurOn={blur}
              onFocus={onFocus}
              registry={reg}
              disabled={disabled}
              readonly={readonly}
            />
          )
        }
      }
    } else if (type === 'boolean') {
      contents = (
        <MDLabelCheckbox
          id={isc.$id}
          key={isc.$id}
          label={label}
          value={''}
          required={false}
          autofocus={false}
          options={{}}
          name={name}
          schema={scm}
          uiSchema={uiScm}
          idSchema={isc}
          formData={formData[name]}
          formContext={undefined}
          onChange={onChange}
          onBlur={onBlur}
          eventBlurOn={blur}
          onFocus={onFocus}
          registry={reg}
          disabled={disabled}
          readonly={readonly}
        />
      )
    } else {
      contents = (
        <SchemaField
          key={isc.$id}
          name={name}
          // required={this.isRequired(name)}
          schema={scm}
          uiSchema={uiScm}
          // errorSchema={errorSchema[name]}
          idSchema={isc}
          formData={formData[name]}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          registry={reg}
          disabled={disabled}
          readonly={readonly} />
      )
    }

    const description = (mode !== 'detail') ? (uiScm['ui:description'] || '') : '';

    if (type && type.startsWith('textarea')) {
      const rows = parseInt(type.replace(/^textarea/, ''), 10);
      return (
        <SingleRow dense={true} groupPaddingBottom={`${rows * 15}px`}>{contents}</SingleRow>
      )
    } else {
      return (
        <React.Fragment>
          {contents}
          {(description) ? <CustomDescription description={description} /> : undefined }
        </React.Fragment>
      )
    }
  } else {
    return <span>not found {name}</span>
  }
}

function getIdSchema(idSchema: any, nameList: string[], i: number = 0): any {
  const scm = idSchema[nameList[i]];
  return (nameList.length - 1 === i) ? scm : getIdSchema(scm, nameList, ++i);
}

function replaceDefinition(schema: any, definitions: any) {
  Object.keys(schema.properties).map((key: string, index: number) => {
    const entry = schema.properties[key];

    if (entry.hasOwnProperty('$ref')) {
      schema.properties[key] = retrieveSchema(entry, definitions);
    } else if (entry.type === 'object') {
      replaceDefinition(entry, definitions);
    }
  });
  return schema;
}

function definitionsExpansion(definitions: any) {
  for (const propName of Object.keys(definitions)) {
    replaceDefinition(definitions[propName], definitions);
  }
}

function renderRoot(props: any) {
  const { uiSchema } = props;
  const layoutGridSchema = uiSchema['ui:layout_grid'];
  return (
    <Grid item={true} container={true} spacing={8} style={{ padding: '10px 10px 10px 10px' }}>
      {renderChildren(layoutGridSchema.children, props)}
    </Grid>
  );
}

interface IProps extends ObjectFieldTemplateProps {
  layoutGridSchema: JSONSchema6,
}

function renderTemp(props: any, key: string) {
  let footer = <div />
  switch (key) {
    case 'EmployeeFormFooter':
      footer = <EmployeeFormFooter />; break;
    case 'SupplierFormFooter':
      footer = <SupplierFormFooter />; break;
    case 'ContractFormFooter':
      footer = <ContractFormFooter />; break;
    case 'EmployeeContractList':
      footer = <EmployeeContractList />; break;
    case 'PartnerContractList':
      footer = <PartnerContractList />; break;
  }
  return footer;
}

const CustomObjectFieldTemplate: React.SFC<IProps> = props => {
  const { layoutGridSchema } = props;
  if (!layoutGridSchema) {
    return renderRoot(props);
  }

  if (layoutGridSchema['ui:template']) {
    return renderTemp(props, layoutGridSchema['ui:template'])
  } else if (layoutGridSchema['ui:row']) {
    return renderRow(layoutGridSchema, props);
  } else if (layoutGridSchema['ui:col']) {
    return renderCol(layoutGridSchema, props);
  } else {
    return renderField(layoutGridSchema, props);
  }
};

export default CustomObjectFieldTemplate;