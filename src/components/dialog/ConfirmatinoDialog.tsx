import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button';
import * as React from 'react';

interface IProps {
    buttonLabel: string
    buttonProps: ButtonProps
    title: string
    positiveLabel: string
    cancelLabel?: string
    onClickPositive(dialog: ConfirmationDialog): void
}

interface IState {
    open: boolean
}

type Props = IProps

class ConfirmationDialog extends React.Component<Props, IState> {
    public state = {
        open: false,
    }

    public handleOpen = () => {
        this.setState({ open: true })
    }

    public handleClose = () => {
        this.setState({ open: false })
    }

    public handlePositive = () => {
        this.props.onClickPositive(this)
    }
    public render() {
        let { cancelLabel } = this.props
        if (!cancelLabel) {
            cancelLabel = "キャンセル"
        }
        console.log(this.handleOpen)
        return (
            <div>
                <Button {...this.props.buttonProps} onClick={this.handleOpen}>{this.props.buttonLabel}</Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogTitle>{this.props.title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {this.props.children}
                        </DialogContentText>
                        <DialogActions>
                            <Button onClick={this.handleClose}>{cancelLabel}</Button>
                            <Button onClick={this.handlePositive}>{this.props.positiveLabel}</Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

export default ConfirmationDialog