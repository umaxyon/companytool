import * as React from 'react';
import { IValidateResult } from 'src/validator/FormValidator';

interface IProps {
  error?: IValidateResult,
}

const MDErrorLabel : React.SFC<IProps> = props => {
  const { error } = props;
  return (
    (error) ?
      <div style={{ fontSize: '11px', color: '#f00', paddingBottom: '15px', marginTop: '-5px' }}>
        {error.msg}
      </div>
      : <React.Fragment />
  );
}

export default MDErrorLabel;