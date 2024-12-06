export type MessageType = 'document' | 'refresh';
export type MessageHandler = <T>(payload: T) => void;

export interface Message<MessageType, T> {
    type: MessageType;
    payload: T;
}

export type DocumentMessage = Message<'document', string>;

export class MessageHandlers {
    public static registeredHandlers: Record<MessageType, MessageHandler[]> = {
        document: [],
        refresh: [],
    };

    public static initialize() {
        window.addEventListener('message', (event) => {
            const message = event.data;

            if ((message.type as MessageType) === 'document') {
                console.log('message received');
                const handlers = MessageHandlers.getMessageHandlers('document');
                handlers.forEach((s) => s(message.text));
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
