import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as InfiniteScroll from 'react-infinite-scroll-component';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { SingleRow } from '../../utils/RowGridUtil';
import { startLoadPartnerContractList, clearContractListData } from './module/SupplierListModule';
import PartnerContractListRow from './PartnerContractListRow';
import { IReduxState } from '../../store';
import { Theme } from '@material-ui/core';
import { StyleRules, createStyles, withStyles, WithStyles } from '@material-ui/core/styles';

const styles = (theme: Theme): StyleRules => createStyles({
    container: {
        justifyContent: 'space-between',
        gridTemplateRows: '100px 1fr 150px 250px',
    },
    engeneer_name: {
        width: 150,
    },
    employee_type: {
        width: 150,
    },
    contract_type: {
        width: 120,
    }
})

export const createPartnerContractRow = (r: any, cnt: number) => (
    <PartnerContractListRow key={`empcr_${cnt}`} data={r} count={cnt} />
);

type Props = WithStyles<typeof styles> & any

class PartnerContractList extends React.Component<Props, any> {
    constructor(props: any) {
        super(props);

        if (this.props.match.path.indexOf('/contract') < 0) {
            // 契約一覧リンクから契約詳細に遷移時にロードが走らないようにpathを確認
            this.load();
        }
    }

    public componentWillUnmount() {
        this.props.clearContractListData();
    }

    public render() {
        const { classes } = this.props
        const endMessage = <div style={{ textAlign: 'center', padding: '5px 0 5px 0' }} />
        return (
            <SingleRow style={{ width: '100%' }}>
                <div>契約一覧</div>
                <div style={{ textAlign: 'center', fontSize: '12px', width: '100%' }}>
                    <div>
                        <List>
                            <ListItem>
                                <Grid container={true} className={classes.container} spacing={16}>
                                    <Grid item={true} className={classes.engeneer_name}>エンジニア名</Grid>
                                    <Grid item={true} className={classes.employee_type}>社員種別</Grid>
                                    <Grid item={true} className={classes.contract_type}>契約形態</Grid>
                                </Grid>
                            </ListItem>
                        </List>
                        <List component='nav'>
                            <Divider />
                            <InfiniteScroll
                                next={this.load}
                                height={300}
                                hasMore={false}
                                dataLength={1000}
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

    public load = () => {
        this.props.load(this.props.match.params.dataId);
    }
}

const mapStateToProps = (state: IReduxState) => ({
    list: state.SupplierListModule.partner_contract_list,
});
const mapDispatchToProps = (dispatch: any) => ({
    load: (partnerId: string) => { dispatch(startLoadPartnerContractList(partnerId)) },
    clearContractListData: () => { dispatch(clearContractListData()) },
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(PartnerContractList)));