import { ColorThemeKind } from 'vscode';

export const getThemeType = (themeKind: ColorThemeKind): 'light' | 'dark' => {
    if (themeKind === ColorThemeKind.HighContrastLight || themeKind === ColorThemeKind.Light) {
        return 'light';
    }

    return 'dark';
};
