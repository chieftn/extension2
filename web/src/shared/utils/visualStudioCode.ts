import type { Message } from '../models/messages';

export type VisualStudioCode = ReturnType<typeof acquireVsCodeApi>;
export interface VisualStudioCodeState {
    document: string;
}

let visualStudioCode: VisualStudioCode | undefined;
export const getVisualStudioCode = (): VisualStudioCode => {
    if (!visualStudioCode) {
        visualStudioCode = acquireVsCodeApi();
    }

    return visualStudioCode;
};

export const postMessage = (message: Message<unknown, unknown>): void => {
    getVisualStudioCode().postMessage(message);
};

export const getState = (): VisualStudioCodeState => {
    return (getVisualStudioCode().getState() as VisualStudioCodeState) || { document: '' };
};

export const setState = (state: VisualStudioCodeState): VisualStudioCodeState => {
    return getVisualStudioCode().setState(state);
};
