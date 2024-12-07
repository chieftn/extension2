export type MessageType = 'document' | 'theme';
export type RequestMessageType = `${MessageType}Request`;
export type ResponseMessageType = `${MessageType}Response`;
export type UpdateMessageType = `${MessageType}Update`;

export type MessageHandler = <T extends ResponseMessageType>(payload: T) => void;
export interface Message<MessageType, T> {
    type: MessageType;
    payload: T;
}

export class MessageHandlers {
    public static registeredHandlers: Record<ResponseMessageType, MessageHandler[]> = {
        documentResponse: [],
        themeResponse: [],
    };

    public static initialize() {
        window.addEventListener('message', (event) => {
            const message = event.data;

            if ((message.type as ResponseMessageType) === 'documentResponse') {
                const handlers = MessageHandlers.getMessageHandlers('documentResponse');
                handlers.forEach((s) => s(message.payload));
                return;
            }

            if ((message.type as ResponseMessageType) === 'themeResponse') {
                const handlers = MessageHandlers.getMessageHandlers('themeResponse');
                handlers.forEach((s) => s(message.payload));
                return;
            }
        });
    }

    public static getMessageHandlers = (messageType: ResponseMessageType): MessageHandler[] => {
        return MessageHandlers.registeredHandlers[messageType];
    };

    public static registerMessageHandler = (messageType: ResponseMessageType, messageHandler: MessageHandler): void => {
        MessageHandlers.registeredHandlers[messageType] = [
            ...MessageHandlers.registeredHandlers[messageType],
            messageHandler,
        ];
    };

    public static unregisterMessageHandler = (messageHandler: MessageHandler): void => {
        MessageHandlers.registeredHandlers = { ...MessageHandlers.registeredHandlers };

        Object.keys(messageHandler).forEach((s) => {
            MessageHandlers.registeredHandlers[s as ResponseMessageType] = MessageHandlers.registeredHandlers[
                s as ResponseMessageType
            ].filter((handler) => handler !== messageHandler);
        });
    };
}
