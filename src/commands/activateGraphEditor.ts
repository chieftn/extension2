import * as vscode from 'vscode';

export const registerActivateGraphEditor = () => {
    return vscode.commands.registerCommand('graphEditor.open', () => {
        // vscode.commands.executeCommand('vscode.')
        vscode.window.showInformationMessage('my cool message');
        // Create and show a new webview
    //   const panel = vscode.(
    //        'catCoding', // Identifies the type of the webview. Used internally
    //        'Cat Coding', // Title of the panel displayed to the user
    //        vscode.ViewColumn.One, // Editor column to show the new webview panel in.
    //        {} // Webview options. More on these later.
    //      );
       });
};
