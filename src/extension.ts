import * as vscode from 'vscode';
import { GraphEditorProvider } from './graphEditor';
import { registerActivateGraphEditor } from './commands/activateGraphEditor';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(GraphEditorProvider.register(context));
	context.subscriptions.push(registerActivateGraphEditor());

}

// This method is called when your extension is deactivated
export function deactivate() {}
