import { useState, useEffect } from 'react';
import { VisualStudioCode } from '@/shared/utils/visualStudioCode';
import { MessageHandlers, type MessageHandler } from '@/shared/utils/messageHandlers';

export interface Document {
    text?: string;
    update: (text: string) => void;
}
export const useDocument = (): Document => {
    const [document, setDocument] = useState<undefined | string>();

    useEffect(() => {
        MessageHandlers.registerMessageHandler('document', setDocument as MessageHandler);
        VisualStudioCode.postMessage({ type: 'refresh', payload: '' });

        return MessageHandlers.unregisterMessageHandler(setDocument as MessageHandler);
    }, []);

    return {
        text: document,
        update: (text) => {
            setDocument(text);
            // postMessage({ type: 'document', payload: text });
        },
    };
};
