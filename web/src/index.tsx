import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { GraphView } from './views/graph/graphView';

const domNode = document.getElementById('root');
const root = createRoot(domNode!);

root.render(<GraphView />);
