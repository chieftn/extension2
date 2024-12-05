const vscode = acquireVsCodeApi();

window.addEventListener('message', (event) => {
    const message = event.data; // The json data that the extension sent
    switch (message.type) {
        case 'update':
            const text = message.text;

            // Update our webview's content
            console.log(`updated + ${message.text}`);

            // Then persist state information.
            // This state is returned in the call to `vscode.getState` below when a webview is reloaded.
            vscode.setState({ text });

            return;
    }
});

export const getState = (): string => {
    return (vscode.getState() as any).text as string;
};

export const sendMessage = () => {
    try {
        console.log('sending message');
        vscode.postMessage({ type: 'helloworld' });
    } catch (e) {
        console.log('ruh roh 1');
        console.log(e);
    }
};
