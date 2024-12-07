import * as React from 'react';
import { FluentProvider, Button, webDarkTheme } from '@fluentui/react-components';
import { useTheme, ThemeContext } from './shared/hooks/useTheme';
import { GraphView } from './views/graph/graphView';

// const useStyles = makeStyles({
//     button: {
//         color: 'red',
//     },
// });

export const App: React.FC = () => {
    // const { button } = useStyles();
    const theme = useTheme();

    return (
        <FluentProvider theme={webDarkTheme}>
            <Button>hello</Button>
            {/* <div className={button} style={{ height: 40, width: 40, color: 'red' }}>
                hello
            </div> */}
            <ThemeContext.Provider value={theme}>
                <GraphView />
            </ThemeContext.Provider>
        </FluentProvider>
    );
};
