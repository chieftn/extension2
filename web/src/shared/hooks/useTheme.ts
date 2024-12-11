import { useState, useEffect, useContext, createContext } from 'react';
import { VisualStudioCode } from '@/shared/utils/visualStudioCode';
import { MessageHandlers, type MessageHandler } from '@/shared/utils/messageHandlers';

export type ThemeType = 'light' | 'dark';
export interface ThemeContext {
    type?: ThemeType;
}

export const useTheme = (): ThemeContext => {
    const [type, setThemeType] = useState<ThemeType | undefined>();

    useEffect(() => {
        MessageHandlers.registerMessageHandler('themeResponse', setThemeType as MessageHandler);
        VisualStudioCode.postMessage({ type: 'themeRequest', payload: '' });

        return MessageHandlers.unregisterMessageHandler(setThemeType as MessageHandler);
    }, []);

    return {
        type,
    };
};

export const ThemeContext = createContext<ThemeContext | undefined>(undefined);
export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('missing theme context');
    }

    return context;
};
