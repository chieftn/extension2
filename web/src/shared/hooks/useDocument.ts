import { useState, useEffect, useRef, useContext, createContext } from 'react';
import { VisualStudioCode } from '@/shared/utils/visualStudioCode';
import { MessageHandlers, type MessageHandler } from '@/shared/utils/messageHandlers';

export interface Document {
    text: string;
    update: (text: string) => void;
    mode: 'fetching' | 'idle';
}
export const useDocument = (): Document => {
    const [document, setDocument] = useState<string | undefined>();
    const documentRef = useRef<undefined | string>();

    useEffect(() => {
        const setDocumentContent = (text: string) => {
            if (documentRef.current !== text) {
                setDocument(text);
            }
        };

        MessageHandlers.registerMessageHandler('documentResponse', setDocumentContent as MessageHandler);
        VisualStudioCode.postMessage({ type: 'documentRequest', payload: '' });

        return MessageHandlers.unregisterMessageHandler(setDocumentContent as MessageHandler);
    }, []);

    return {
        text: document || '',
        mode: (!!document && 'idle') || 'fetching',
        update: (text) => {
            setDocument(text);
            documentRef.current = text;
            VisualStudioCode.postMessage({ type: 'documentUpdate', payload: text });
        },
    };
};

export const DocumentContext = createContext<Document | undefined>(undefined);
export const useDocumentContext = () => {
    const context = useContext(DocumentContext);
    if (!context) {
        throw new Error('missing document context');
    }

    return context;
};
