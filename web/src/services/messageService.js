"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const vscode = acquireVsCodeApi();
const sendMessage = () => {
    try {
        console.log('sending message');
        vscode.postMessage({ type: 'helloworld' });
    }
    catch (e) {
        console.log('ruh roh');
        console.log(e);
    }
};
exports.sendMessage = sendMessage;
//# sourceMappingURL=messageService.js.map