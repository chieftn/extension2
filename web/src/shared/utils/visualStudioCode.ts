import type { Message } from './messageHandlers';

export interface VisualStudioCodeState {
    document: string;
}

export class VisualStudioCode {
    static api = acquireVsCodeApi();

    public static postMessage(message: Message<unknown, unknown>): void {
        VisualStudioCode.api.postMessage(message);
    }

    public static getState(): VisualStudioCodeState {
        return (VisualStudioCode.api.getState() as VisualStudioCodeState) || { document: '' };
    }

    public static setState(state: VisualStudioCodeState): VisualStudioCodeState {
        return VisualStudioCode.api.setState(state);
    }
}
