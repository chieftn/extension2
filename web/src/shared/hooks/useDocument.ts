import { useState, useEffect } from 'react';
import { VisualStudioCode } from '@/shared/utils/visualStudioCode';
import { MessageHandlers, type MessageHandler } from '@/shared/utils/messageHandlers';

export interface Document {
    text?: string;
    update: (text: string) => void;
    updates: string[];
}
export const useDocument = (): Document => {
    const [document, setDocument] = useState<undefined | string>();
    const [updates, setUpdates] = useState<string[]>([]);

    useEffect(() => {
        setDocument(VisualStudioCode.getState()?.document);
        const setDocumentHandler = (text: string) => {
            console.log(`handling at ${Date.now()}`);
            setUpdates([...updates, `${Date.now().toString()}: Received ${text}`]);
            setDocument(text);
        };

        MessageHandlers.registerMessageHandler('document', setDocumentHandler as MessageHandler);

        return MessageHandlers.unregisterMessageHandler(setDocumentHandler as MessageHandler);
    }, []);

    return {
        text: document,
        updates,
        update: (text) => {
            setDocument(text);
            // postMessage({ type: 'document', payload: text });
        },
    };
};
