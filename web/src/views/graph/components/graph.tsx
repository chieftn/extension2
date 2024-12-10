import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { ReactFlow, Controls, MiniMap, Background, BackgroundVariant } from '@xyflow/react';
import { useThemeContext } from '@/shared/hooks/useTheme';
import '@xyflow/react/dist/style.css';

const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export const useGraphStyles = makeStyles({
    rootStyle: {
        width: '100%',
        height: '100%',
    },
});
export const Graph: React.FC = () => {
    const { rootStyle } = useGraphStyles();
    const { type } = useThemeContext();

    return (
        <div className={rootStyle}>
            <ReactFlow colorMode={type} nodes={initialNodes} edges={initialEdges}>
                <Controls />
                <MiniMap />
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
        </div>
    );
};
