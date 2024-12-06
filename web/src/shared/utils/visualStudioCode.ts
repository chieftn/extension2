import type { Message } from './messageHandlers';

export class VisualStudioCode {
    static api = acquireVsCodeApi();

    public static postMessage(message: Message<unknown, unknown>): void {
        VisualStudioCode.api.postMessage(message);
    }
}
