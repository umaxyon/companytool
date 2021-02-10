import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

interface IMDDialog {
    notifyClose: any,
    open: boolean,
    onClickOk?: any,
    onClickCancel?: any,
    labelOk: string,
    labelCancel: string,
    title?: string,
}

class MDDialog extends React.Component<IMDDialog, any> {
    constructor(props: any) {
        super(props);
        this.btnOk = this.btnOk.bind(this);
        this.btnCancel = this.btnCancel.bind(this);
        this.title = this.title.bind(this);
    }

    public handleClose() {
        this.props.notifyClose();
    }

    public render() {
        return (
            <div>
                <Dialog open={this.props.open} onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    {this.title()}
                    <DialogContent>
                        {this.props.children}
                    </DialogContent>
                    <DialogActions>
                        {this.btnCancel()}
                        {this.btnOk()}
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

    private title() {
        if (this.props.title) {
            return <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
        }
        return <React.Fragment />
    }

    private btnOk() {
        const label = this.props.labelOk || 'OK';
        const onClick: any = () => {
            if (this.props.onClickOk) {
                this.props.onClickOk();
            }
            this.handleClose();
        }

        return <Button onClick={onClick} color="primary">{label}</Button>
    }
    private btnCancel() {
        const label = this.props.labelCancel || 'Cancel';
        const onClick: any = () => {
            if (this.props.onClickCancel) {
                this.props.onClickCancel();
            }
            this.handleClose();
        }
        return <Button onClick={onClick} color="primary">{label}</Button>
    }
}

export default MDDialog;