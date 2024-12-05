import * as React from 'react';
import { sendMessage } from './services/messageService';

export const App: React.FC = () => {
    React.useEffect(() => {
        console.log('here we are');
        sendMessage();
    }, []);

    return <div>Hello world</div>;
};
