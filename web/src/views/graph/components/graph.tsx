import * as React from 'react';
import { ReactFlow, Controls, MiniMap, Background, BackgroundVariant } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export const Graph: React.FC = () => {
    return (
        <div style={{ width: '80vw', height: '80vh' }}>
            <ReactFlow colorMode="dark" nodes={initialNodes} edges={initialEdges}>
                <Controls />
                <MiniMap />
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
        </div>
    );
};
