import { useState, useEffect, useRef } from 'react';
import { VisualStudioCode } from '@/shared/utils/visualStudioCode';
import { MessageHandlers, type MessageHandler } from '@/shared/utils/messageHandlers';

export interface Document {
    text?: string;
    update: (text: string) => void;
}
export const useDocument = (): Document => {
    const [document, setDocument] = useState<undefined | string>();
    const documentRef = useRef<undefined | string>();

    useEffect(() => {
        const setDocumentContent = (text: string) => {
            if (documentRef.current !== text) {
                setDocument(text);
            }
        };

        MessageHandlers.registerMessageHandler('document', setDocumentContent as MessageHandler);
        VisualStudioCode.postMessage({ type: 'refresh', payload: '' });

        return MessageHandlers.unregisterMessageHandler(setDocumentContent as MessageHandler);
    }, []);

    return {
        text: document,
        update: (text) => {
            setDocument(text);
            documentRef.current = text;
            VisualStudioCode.postMessage({ type: 'documentUpdate', payload: text });
        },
    };
};
