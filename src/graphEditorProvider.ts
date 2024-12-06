import * as vscode from 'vscode';
import { getNonce } from './utils';

export class GraphEditorProvider implements vscode.CustomTextEditorProvider {
    public static readonly viewType = 'tinykube.graph';

    public static register(context: vscode.ExtensionContext): vscode.Disposable {
        const provider = new GraphEditorProvider(context);
        const providerRegistration = vscode.window.registerCustomEditorProvider(GraphEditorProvider.viewType, provider);
        return providerRegistration;
    }

    constructor(private readonly context: vscode.ExtensionContext) {}

    public async resolveCustomTextEditor(
        document: vscode.TextDocument,
        webviewPanel: vscode.WebviewPanel,
        _token: vscode.CancellationToken
    ): Promise<void> {
        // Setup initial content for the webview
        webviewPanel.webview.options = {
            enableScripts: true,
        };
        webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview);

        function updateWebview() {
            webviewPanel.webview.postMessage({
                type: 'document',
                text: document.getText(),
            });
        }
        const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument((e) => {
            if (e?.document.uri.toString() === document.uri.toString()) {
                updateWebview();
            }
        });

        // Make sure we get rid of the listener when our editor is closed.
        webviewPanel.onDidDispose(() => {
            console.log('dispose');
            changeDocumentSubscription.dispose();
        });

        // Receive message from the webview.
        webviewPanel.webview.onDidReceiveMessage((e) => {
            if (e.type === 'refresh') {
                updateWebview();
                return;
            }

            if (e.type === 'document') {
                console.log('document');
                return;
            }
        });

        updateWebview();
    }

    private getHtmlForWebview(webview: vscode.Webview): string {
        const nonce = getNonce();
        const scriptUri = webview.asWebviewUri(
            vscode.Uri.joinPath(this.context.extensionUri, 'web', 'dist', 'index.js')
        );

        return `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${webview.cspSource}; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title></title>
                </head>
                <body>
                    <div id="root"></div>
                    <script nonce="${nonce}" src="${scriptUri}"></script>
                </body>
            </html>`;
    }

    // private updateTextDocument(document: vscode.TextDocument, json: any) {
    //     const edit = new vscode.WorkspaceEdit();

    //     // Just replace the entire document every time for this example extension.
    //     // A more complete extension should compute minimal edits instead.
    //     edit.replace(document.uri, new vscode.Range(0, 0, document.lineCount, 0), JSON.stringify(json, null, 2));

    //     return vscode.workspace.applyEdit(edit);
    // }
}
