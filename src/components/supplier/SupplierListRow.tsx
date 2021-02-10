import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router'
import { createStyles } from '@material-ui/core';
import { StyleRules, Theme, WithStyles, withStyles } from '@material-ui/core/styles';

const styles = (theme: Theme): StyleRules => createStyles({
    container: {
        justifyContent: 'space-between'
    },
    name: {
    },
    client_oropriety: {
        minWidth: 100
    },
    bp_oropriety: {
        minWidth: 100
    }
})

interface ISupplierListRowProps {
    count: number,
    history: any,
    data: any
}

type Props = WithStyles<typeof styles> & ISupplierListRowProps

class SupplierListRow extends React.Component<Props, any> {
    constructor(props: any) {
        super(props);
        this.clickRow = this.clickRow.bind(this);
    }

    public render() {
        const { classes, data } = this.props;
        return (
            <React.Fragment key={`supp${this.props.count}`}>
                <ListItem button={true} onClick={() => this.clickRow(data.partner_id)}>
                    <Grid container={true} className={classes.container} spacing={16}>
                        <Grid item={true} className={classes.name} xs={6} >{data.name}</Grid>
                        <Grid item={true} className={classes.client_oropriety}>{data.client_oropriety}</Grid>
                        <Grid item={true} className={classes.bp_oropriety}>{data.bp_oropriety}</Grid>
                    </Grid>
                </ListItem>
                <Divider />
            </React.Fragment>
        )
    }

    private clickRow(dataId: string) {
        this.props.history.push(`${process.env.PUBLIC_URL}/supplier/detail/${dataId}`);
    }
}

export default withStyles(styles)(withRouter(SupplierListRow));