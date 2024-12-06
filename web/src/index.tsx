import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { GraphView } from './views/graph/graphView';
import { MessageHandlers } from './shared/utils/messageHandlers';

MessageHandlers.initialize();

const domNode = document.getElementById('root');
const root = createRoot(domNode!);

root.render(<GraphView />);
