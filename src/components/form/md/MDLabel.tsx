import * as React from 'react';
// import { withStyles } from '@material-ui/core';
// import { SimpleLabelAndValue } from '../../../utils/RowGridUtil';
import { AsYouType } from 'libphonenumber-js'

// const LabelValue = withStyles(theme => ({
//   label: {
//     fontSize: 15,
//   },
//   value: {
//     fontSize: 15,
//     paddingLeft: '20px',
//   }
// }))(SimpleLabelAndValue);

interface IMDLabelProps {
  label: string | undefined,
  type?: string | undefined,
  value: string | undefined,
}

function convertValue(type: string | undefined, val: any) {
  if (val) {
    if (type === 'phone') {
      return new AsYouType('JP').input(val)
    } else if (type === 'currency') {
      return convertComma(val, '円');
    } else if (type === 'num_human') {
      return convertComma(val, '人');
    } else if (type === 'percent') {
      return (val === null || isNaN(val)) ? val : convertComma(val, '%');
    }
  }
  return val;
}

function convertComma(val: string, suffix?: string) {
  const v = val.replace(/(\d)(?=(\d\d\d)+$)/g, "$1,");
  return (v && v !== '　') ? v + (suffix || '') : '';
}

const MDLabel: React.SFC<IMDLabelProps> = props => {
  const { label, value, } = props;
  const strVal: string = (value) ? value.toString() : '';
  const strLabel: string = ('string' === typeof label) ? label : '';

  const val = strVal.split(/[\r\n]/).map((line, key) => {
    return <span key={key}>{convertValue(props.type, line)}<br /></span>
  })

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '200px 1fr',
      width: '95%'
    }}>
      <div style={{
        gridColumn: '1',
        display: 'flex',
        alignItems: 'center',
        color: 'rgba(0, 0, 0, 0.6)',
        fontSize: '15px',
      }}>{strLabel}</div>
      <div style={{ gridColumn: '2', fontSize: '13px', alignSelf: 'center' }}>{val}</div>
    </div>
    // <LabelValue label={strLabel} value={val} />
  );
}
export default MDLabel;