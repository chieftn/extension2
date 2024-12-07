import type { Message, RequestMessageType, UpdateMessageType } from './messageHandlers';

export class VisualStudioCode {
    static api = acquireVsCodeApi();

    public static postMessage(message: Message<RequestMessageType | UpdateMessageType, unknown>): void {
        VisualStudioCode.api.postMessage(message);
    }
}
