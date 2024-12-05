const vscode = acquireVsCodeApi();

export const sendMessage = () => {
    try {
        console.log('sending message');
        vscode.postMessage({ type: 'helloworld' });
    } catch (e) {
        console.log('ruh roh 1');
        console.log(e);
    }
};
