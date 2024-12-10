import * as vscode from 'vscode';
import { getNonce } from './utils/crypto';
import { getThemeType } from './utils/theme';

export class GraphEditorProvider implements vscode.CustomTextEditorProvider {
    public static readonly viewType = 'dataflow.graph';

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
        webviewPanel.webview.options = {
            enableScripts: true,
        };
        webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview);

        function sendDocument() {
            webviewPanel.webview.postMessage({
                type: 'documentResponse',
                payload: document.getText(),
            });
        }

        function sendTheme() {
            webviewPanel.webview.postMessage({
                type: 'themeResponse',
                payload: getThemeType(vscode.window.activeColorTheme.kind),
            });
        }

        const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument((e) => {
            if (e?.document.uri.toString() !== document.uri.toString()) {
                return;
            }

            if (
                e.reason === vscode.TextDocumentChangeReason.Redo ||
                e.reason === vscode.TextDocumentChangeReason.Undo
            ) {
                sendDocument();
                return;
            }

            if (!webviewPanel.active) {
                sendDocument();
                return;
            }
        });

        const themeSubscription = vscode.window.onDidChangeActiveColorTheme((e) => {
            sendTheme();
        });

        webviewPanel.onDidDispose(() => {
            changeDocumentSubscription.dispose();
            themeSubscription.dispose();
        });

        webviewPanel.webview.onDidReceiveMessage((e) => {
            if (e.type === 'documentRequest') {
                sendDocument();
                return;
            }

            if (e.type === 'documentUpdate') {
                const edit = new vscode.WorkspaceEdit();
                edit.replace(document.uri, new vscode.Range(0, 0, document.lineCount, 0), e.payload);
                vscode.workspace.applyEdit(edit);
                return;
            }

            if (e.type === 'themeRequest') {
                sendTheme();
                return;
            }
        });

        sendDocument();
    }

    private getHtmlForWebview(webview: vscode.Webview): string {
        const nonce = getNonce();

        const css = webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, 'web', 'build', 'index.css'));
        const script = webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, 'web', 'build', 'index.js'));

        return `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta content="default-src 'none'; img-src ${webview.cspSource} https:; script-src ${webview.cspSource}; style-src ${webview.cspSource};">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>body { height: 100vh; width: 100vw; padding: 0px; margin: 0px;}</style>
                    <link rel="stylesheet" href="${css}" />
                    <title></title>
                </head>
                <body>
                    <div id="root"></div>
                    <script nonce="${nonce}" src="${script}"></script>
                </body>
            </html>`;
    }
}
