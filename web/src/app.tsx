import * as React from 'react';
import { sendMessage, getState } from './services/messageService';

export const App: React.FC = () => {
    React.useEffect(() => {
        console.log(getState());
        sendMessage();
    }, []);

    return <div>Hello world</div>;
};
