import * as React from 'react';
import { withRouter } from 'react-router';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import { Theme } from '@material-ui/core';
import { StyleRules, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { getContractTypeIcon, getEmployeeTypeIcon } from 'src/utils/IconUtil';

const styles = (theme: Theme): StyleRules => createStyles({
    container: {
        justifyContent: 'space-between',
    },
    engeneer_name: {
        width: 150,
        alignSelf: 'center',
    },
    employee_type: {
        width: 150,
        alignSelf: 'center',
    },
    contract_type: {
        width: 120,
        fontSize: 13,
    }
})

interface IPartnerContractListRowProps {
    count: number,
    history: any,
    data: any,
}

type Props = WithStyles<typeof styles> & IPartnerContractListRowProps

class PartnerContractListRow extends React.Component<Props, any> {
    constructor(props: any) {
        super(props);
        this.clickRow = this.clickRow.bind(this);
    }

    public render() {
        const { classes, data } = this.props
        const empType = data.employee_type ? <Chip icon={getEmployeeTypeIcon(data.employee_type_value)} label={data.employee_type} variant="outlined" /> : '';
        const contType = data.contract_type ? <Chip icon={getContractTypeIcon(data.contract_type_value)} label={data.contract_type} variant="outlined" /> : '';
        return (
            <React.Fragment key={`partcontItem${this.props.count}`}>
                <ListItem button={true} onClick={() => this.clickRow(data.contract_id)}>
                    <Grid container={true} className={classes.container}>
                        <Grid item={true} className={classes.engeneer_name}>{data.engineer_name}</Grid>
                        <Grid item={true} className={classes.employee_type}>{empType}</Grid>
                        <Grid item={true} className={classes.contract_type}>{contType}</Grid>
                    </Grid>
                </ListItem>
                <Divider />
            </React.Fragment>
        )
    }

    private clickRow(dataId: string) {
        this.props.history.push(`${process.env.PUBLIC_URL}/contract/detail/${dataId}`);
    }
}

export default withStyles(styles)(withRouter(PartnerContractListRow));
