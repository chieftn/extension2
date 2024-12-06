import { VisualStudioCode } from './visualStudioCode';

export type MessageType = 'document';
export type MessageHandler = <T>(payload: T) => void;

export interface Message<MessageType, T> {
    type: MessageType;
    payload: T;
}

export type DocumentMessage = Message<'document', string>;

export class MessageHandlers {
    public static registeredHandlers: Record<MessageType, MessageHandler[]> = {
        document: [],
    };

    public static initialize() {
        window.addEventListener('message', (event) => {
            const message = event.data;

            if ((message.type as MessageType) === 'document') {
                const handlers = MessageHandlers.getMessageHandlers('document');
                handlers.forEach((s) => s(message.text));

                const state = { ...VisualStudioCode.getState(), document: message.text };
                VisualStudioCode.setState({ ...state, document: message.text });
            }
        });
    }

    public static getMessageHandlers = (messageType: MessageType): MessageHandler[] => {
        return MessageHandlers.registeredHandlers[messageType];
    };

    public static registerMessageHandler = (messageType: MessageType, messageHandler: MessageHandler): void => {
        MessageHandlers.registeredHandlers[messageType] = [
            ...MessageHandlers.registeredHandlers[messageType],
            messageHandler,
        ];
    };

    public static unregisterMessageHandler = (messageHandler: MessageHandler): void => {
        MessageHandlers.registeredHandlers = { ...MessageHandlers.registeredHandlers };

        Object.keys(messageHandler).forEach((s) => {
            MessageHandlers.registeredHandlers[s as MessageType] = MessageHandlers.registeredHandlers[
                s as MessageType
            ].filter((handler) => handler !== messageHandler);
        });
    };
}
