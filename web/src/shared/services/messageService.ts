import type { MessageType, MessageHandler } from '@/shared/models/messages';
import { getState, setState } from '@/shared/utils/visualStudioCode';

window.addEventListener('message', (event) => {
    const message = event.data;
    console.log(message);
    if ((message.type as MessageType) === 'document') {
        const handlers = getMessageHandlers('document');
        handlers.forEach((s) => s(message.text));

        const state = { ...getState(), document: message.text };
        setState({ ...state, document: message.text });
    }
});

export let messageHandlers: Record<MessageType, MessageHandler[]> = {
    document: [],
};

export const getMessageHandlers = (messageType: MessageType): MessageHandler[] => {
    return messageHandlers[messageType];
};

export const registerMessageHandler = (messageType: MessageType, messageHandler: MessageHandler): void => {
    messageHandlers[messageType] = [...messageHandlers[messageType], messageHandler];
};

export const unregisterMessageHandler = (messageHandler: MessageHandler): void => {
    messageHandlers = { ...messageHandlers };
    Object.keys(messageHandler).forEach((s) => {
        messageHandlers[s as MessageType] = messageHandlers[s as MessageType].filter(
            (handler) => handler !== messageHandler
        );
    });
};
