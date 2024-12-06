export type MessageType = 'document';
export type MessageHandler = <T>(payload: T) => void;

export interface Message<MessageType, T> {
    type: MessageType;
    payload: T;
}

export type DocumentMessage = Message<'document', string>;
