import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import { withRouter } from 'react-router';
import { AsYouType } from 'libphonenumber-js'
import { Theme } from '@material-ui/core';
import { StyleRules, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { getEmployeeTypeIcon } from 'src/utils/IconUtil';

const FONT_SMALL = 13

const styles = (theme: Theme): StyleRules => createStyles({
    container: {
        justifyContent: 'space-between'
    },
    name: {
        width: 120,
        alignSelf: 'center',
    },
    phone: {
        width: 130,
        fontSize: FONT_SMALL,
        alignSelf: 'center',
    },
    age: {
        width: 50,
        alignSelf: 'center',
    },
    employee_type: {
        width: 120,
    },
    career_history: {
        width: 90,
        fontSize: FONT_SMALL,
        alignSelf: 'center',
    },
    nearest_station: {
        width: 180,
        fontSize: FONT_SMALL,
        alignSelf: 'center',
    },
})

interface IEmployeeListRowProps {
    count: number,
    history: any,
    data: any
}

type Props = WithStyles<typeof styles> & IEmployeeListRowProps

class EmployeeListRow extends React.Component<Props, any> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        const { classes, data } = this.props;
        const phone = data.cellphone_number ? new AsYouType('JP').input(data.cellphone_number) : '';
        const rowStyle = data.retirement_or_not_contract_target ? { backgroundColor: '#ddd' } : {};

        return (
            <React.Fragment key={`empItem${this.props.count}`}>
                <ListItem button={true} onClick={() => this.clickRow(data.employee_id)} style={rowStyle}>
                    <Grid container={true} className={classes.container} spacing={16}>
                        <Grid item={true} className={classes.name}>{data.name}</Grid>
                        <Grid item={true} className={classes.phone}>{phone}</Grid>
                        <Grid item={true} className={classes.age}>{data.age}</Grid>
                        <Grid item={true} className={classes.employee_type}>
                            <Chip icon={getEmployeeTypeIcon(data.employee_type_value)} label={data.employee_type} variant="outlined" />
                        </Grid>
                        <Grid item={true} className={classes.career_history}>{data.career_history}</Grid>
                        <Grid item={true} className={classes.nearest_station}>{data.nearest_station}</Grid>
                    </Grid>
                </ListItem>
                <Divider />
            </React.Fragment>
        )
    }

    private clickRow = (dataId: string) => {
        this.props.history.push(`${process.env.PUBLIC_URL}/employee/detail/${dataId}`);
    }
}

export default withStyles(styles)(withRouter(EmployeeListRow));