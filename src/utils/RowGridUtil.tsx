import { Grid, Typography } from '@material-ui/core';
import { GridSize } from '@material-ui/core/Grid';
import { StyleRules, WithStyles } from '@material-ui/core/styles/withStyles';
import * as React from 'react';

interface IRowProp {
    children: React.ReactNode | any,
    dense?: boolean | undefined,
    style?: any,
    groupPaddingBottom?: string | undefined,
}

// <Grid container={true} />の中で、1行に1列を表示する際に使用
export function SingleRow(props: IRowProp) {
    return Row(props, 12, undefined)
}

// <Grid container={true} />の中で、1行に2列を表示する際に使用
export function TwoRow(props: IRowProp) {
    return Row(props, 6, 6)
}

// ラベルと値のシンプルな表示
export function SimpleLabelAndValue(props: WithStyles<StyleRules> & { label: string, value: any, dense?: boolean | undefined }) {
    const { classes, label, value } = props;
    const style = {
        alignItems: 'center',
    }
    return (
        <Grid item={true} container={true} style={style}>
            <Grid item={true}>
                <Typography className={classes.label} color="textSecondary">{label}</Typography>
            </Grid>
            <Grid item={true}>
                <Typography className={classes.value}>{value}</Typography>
            </Grid>
        </Grid>
    )
}

function Row(props: IRowProp, xs: GridSize | undefined, lg: GridSize | undefined) {
    let style = Object.assign({}, props.style, !props.dense ? { paddingLeft: '0px', paddingRight: '5px' } : {});

    const rows = React.Children.map(props.children, (child, index) => {
        if (props.groupPaddingBottom) {
            style = Object.assign(style, { paddingBottom: props.groupPaddingBottom });
        }
        return (
            <Grid item={true} xs={xs} lg={lg} container={true} direction="row" spacing={0} style={style}>
                {child}
            </Grid>
        )
    })

    return (
        <React.Fragment>
            {rows}
        </React.Fragment>
    )
}