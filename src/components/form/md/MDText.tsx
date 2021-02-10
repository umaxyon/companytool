import * as React from 'react';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core';
import { StyleRules } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'

const styles = (theme: Theme): StyleRules => createStyles({
    textField: {
        height: '35px',
    },
    resize: {
        fontSize: '13px',
    },
    textArea: {
        // height: '35px',
        fontSize: '11px',
        borderTop: '1px solid #ccc',
        borderLeft: '1px solid #ccc',
        borderRight: '1px solid #ccc',
        borderRadius: '5px 5px 0 0',
        marginBottom: '-7px',
        padding: '0 5px 0 5px',
    },
    root: {
        alignItems: 'flex-end',
    }
})

interface IMDTextProps {
    label: string,
    type: string,
    width: string,
    value: string,
    style?: object,
    onChange?: any,
    onBlur?: any,
    error: boolean,
}

type Props = WithStyles<typeof styles> & IMDTextProps;

class MDText extends React.Component<Props, any> {
    public render() {
        const { type, width, value, classes, onChange, onBlur } = this.props;
        let t = type;
        let multiline = false;
        let rows = "1";
        let fullWidth = (width === 'max');
        // let inputClassName = classes.resize;
        const inputClasses = { classes:{ root: '', input: classes.resize }};
        if (type.startsWith('textarea')) {
            t = 'text';
            multiline = true;
            rows = type.replace(/^textarea/, '');
            fullWidth = true;
            // inputClassName = classes.textArea;
            inputClasses.classes.root = classes.root;
            inputClasses.classes.input = classes.textArea;
        }

        return (
            <TextField
                type={t}
                error={this.props.error}
                className={classes.textField}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                multiline={multiline}
                rows={rows}
                fullWidth={fullWidth}
                margin="dense"
                variant="standard"
                InputProps={inputClasses}
            />
        );
    }
}

export default withStyles(styles)(MDText);
