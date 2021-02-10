import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as InfiniteScroll from 'react-infinite-scroll-component';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { SingleRow } from '../../utils/RowGridUtil';
import { startLoadEmployeeContractList, clearContractListData } from './module/EmployeeListModule';
import EmployeeContractListRow from './EmployeeContractListRow';
import { IReduxState } from '../../store';
import { Theme } from '@material-ui/core';
import { StyleRules, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

const styles = (theme: Theme): StyleRules => createStyles({
    container: {
        justifyContent: 'space-between'
    },
    job_no: {
        width: 80,
    },
    client_name: {
        width: 150,
    },
    contract_type: {
        width: 90,
    },
    start_end_date: {
        width: 180,
    }
})

export const createEmployeeContractRow = (r: any, cnt: number) => (
    <EmployeeContractListRow key={`empcr_${cnt}`} data={r} count={cnt} />
);

type Props = WithStyles<typeof styles> & any

class EmployeeContractList extends React.Component<Props, any> {
    constructor(props: any) {
        super(props);
        this.load = this.load.bind(this);
        if (this.props.match.url.indexOf('/contract') < 0 && this.props.match.url.indexOf('create') < 0) {
            // 契約一覧リンクから契約詳細に遷移時にロードが走らないようにpathを確認
            this.load();
        }
    }

    public componentWillUnmount() {
        this.props.clearContractListData();
    }

    public render() {
        const { classes } = this.props
        const style = { gridTemplateRows: '100px 1fr 150px 250px' };
        const endMessage = <div style={{ textAlign: 'center', padding: '5px 0 5px 0' }} />
        return (
            <SingleRow style={{ width: '100%' }}>
                <div>契約一覧</div>
                <div style={{ textAlign: 'center', fontSize: '12px', width: '100%' }}>
                    <div>
                        <List>
                            <ListItem>
                                <Grid container={true} className={classes.container} spacing={16} style={style}>
                                    <Grid item={true} className={classes.job_no}>JOB No.</Grid>
                                    <Grid item={true} className={classes.client_name}>顧客名</Grid>
                                    <Grid item={true} className={classes.contract_type}>契約形態</Grid>
                                    <Grid item={true} className={classes.start_end_date}>契約開始日 / 終了日</Grid>
                                </Grid>
                            </ListItem>
                        </List>
                        <List component='nav'>
                            <Divider />
                            <InfiniteScroll
                                next={this.load}
                                height={300}
                                hasMore={false}
                                dataLength={5}
                                loader={this.load}
                                endMessage={endMessage}>
                                {this.props.list}
                            </InfiniteScroll>
                        </List>
                    </div>
                </div>
            </SingleRow>
        )
    }

    public load() {
        this.props.load(this.props.match.params.dataId);
    }
}

const mapStateToProps = (state: IReduxState) => ({
    list: state.EmployeeListModule.employee_contract_list,
});
const mapDispatchToProps = (dispatch: any) => ({
    load: (empId: string) => { dispatch(startLoadEmployeeContractList(empId)) },
    clearContractListData: () => { dispatch(clearContractListData()) },
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(EmployeeContractList)));