import lightblue from '@material-ui/core/colors/blue';
// 任意の Theme Colors
import pink from '@material-ui/core/colors/pink';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import * as React from 'react';

const theme = createMuiTheme({
    // Theme Colors
    palette: {
        primary: lightblue,
        secondary: pink,
    },
    // typography
    typography: {
        useNextVariants: true,
    },
});

function withRoot<P>(Component: React.ComponentType<P>) {
    function WithRoot(props: P) {
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...props} />
            </MuiThemeProvider>
        );
    }

    return WithRoot;
}

export default withRoot;