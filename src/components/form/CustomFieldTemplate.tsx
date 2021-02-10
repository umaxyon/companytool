import * as React from "react";
import { SingleRow } from '../../utils/RowGridUtil';

export default (props: any) => {
    const { help, errors, children, description } = props;

    const content = (
        <React.Fragment>
            {children}
            {description}
            {errors}
            {help}
        </React.Fragment>
    );


    return <SingleRow dense={true}>{content}</SingleRow>;
};
