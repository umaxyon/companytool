import * as React from 'react';
import { withRouter } from 'react-router';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import { fmtDate } from '../../utils/FormDataUtil';
import { Theme } from '@material-ui/core';
import { StyleRules, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { getContractTypeIcon } from 'src/utils/IconUtil';

const styles = (theme: Theme): StyleRules => createStyles({
    container: {
        justifyContent: 'space-between'
    },
    job_no: {
        width: 80,
        alignSelf: 'center'
    },
    client_name: {
        width: 150,
        alignSelf: 'center'
    },
    contract_type: {
        width: 90,
        alignSelf: 'center',
        fontSize: 13,
    },
    start_end_date: {
        width: 180,
        alignSelf: 'center',
        fontSize: 13,
    }
})

interface IEmployeeContractListRowProps {
    count: number,
    history: any,
    data: any,
}

type Props = WithStyles<typeof styles> & IEmployeeContractListRowProps

class EmployeeContractListRow extends React.Component<Props, any> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        const { classes, data } = this.props;
        const startEndDate = `${fmtDate(data.start_date, 'YY/MM/DD')} - ${fmtDate(data.end_date, 'YY/MM/DD')}`;
        return (
            <React.Fragment key={`empcontItem${this.props.count}`}>
                <ListItem button={true} onClick={() => this.clickRow(data.contract_id)}>
                    <Grid container={true} className={classes.container} spacing={16}>
                        <Grid item={true} className={classes.job_no}>{data.job_no}</Grid>
                        <Grid item={true} className={classes.client_name}>{data.client_name}</Grid>
                        <Grid item={true} className={classes.contract_type}>
                            <Chip icon={getContractTypeIcon(data.contract_type_value)} label={data.contract_type} variant="outlined" />
                        </Grid>
                        <Grid item={true} className={classes.start_end_date}>{startEndDate}</Grid>
                    </Grid>
                </ListItem>
                <Divider />
            </React.Fragment>
        )
    }

    private clickRow = (dataId: string) => {
        this.props.history.push(`${process.env.PUBLIC_URL}/contract/detail/${dataId}`);
    }
}

export default withStyles(styles)(withRouter(EmployeeContractListRow));
