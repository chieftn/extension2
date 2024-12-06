import { useState, useEffect } from 'react';
import { getState, postMessage } from '@/shared/utils/visualStudioCode';
import { registerMessageHandler, unregisterMessageHandler } from '@/shared/services/messageService';
import type { MessageHandler } from '../models/messages';

export interface Document {
    text?: string;
    update: (text: string) => void;
}

export const useDocument = (): Document => {
    const [document, setDocument] = useState<undefined | string>();

    useEffect(() => {
        setDocument(getState()?.document);
        registerMessageHandler('document', setDocument as MessageHandler);

        return unregisterMessageHandler(setDocument as MessageHandler);
    }, []);

    return {
        text: document,
        update: (text) => postMessage({ type: 'document', payload: text }),
    };
};
