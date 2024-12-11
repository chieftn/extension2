import * as React from 'react';
import { FluentProvider, webDarkTheme, webLightTheme } from '@fluentui/react-components';
import { useTheme, ThemeContext } from './shared/hooks/useTheme';
import { GraphView } from './views/graph/graphView';

export const App: React.FC = () => {
    const theme = useTheme();

    return (
        <FluentProvider theme={theme.type === 'dark' ? webDarkTheme : webLightTheme}>
            <ThemeContext.Provider value={theme}>
                <GraphView />
            </ThemeContext.Provider>
        </FluentProvider>
    );
};
