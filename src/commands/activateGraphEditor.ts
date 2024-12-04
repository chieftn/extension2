import * as vscode from 'vscode';
import { GraphEditorProvider } from '../graphEditorProvider';

export const registerActivateGraphEditor = () => {
    return vscode.commands.registerCommand('graphEditor.open', (context) => {
        const activeEditor = vscode.window.activeTextEditor;
        if (!activeEditor) {
          return;
        }

        const uri = activeEditor.document.uri;
        vscode.commands.executeCommand("vscode.openWith", uri, GraphEditorProvider.viewType);
       });
};
