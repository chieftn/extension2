import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import {
    ReactFlow,
    Controls,
    MiniMap,
    Background,
    BackgroundVariant,
    useNodesState,
    useEdgesState,
} from '@xyflow/react';
import { useThemeContext } from '@/shared/hooks/useTheme';
import { useGraphContext } from '../hooks/useGraph';
import '@xyflow/react/dist/style.css';

export const useGraphStyles = makeStyles({
    rootStyle: {
        width: '100%',
        height: '100%',
    },
});
export const Graph: React.FC = () => {
    const { rootStyle } = useGraphStyles();
    const { type } = useThemeContext();
    const { graph } = useGraphContext();
    const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<any>([]);

    React.useEffect(() => {
        const nodes =
            graph?.operators.map((s) => ({
                id: s.id.toString(),
                position: { x: 0, y: 0 },
                data: { ...s, label: s.id.toString() },
            })) || [];

        const edges =
            graph?.edges.map((s) => ({
                source: s.from.toString(),
                target: s.to.toString(),
                id: `${s.from}-${s.to}`,
            })) || [];

        setNodes(nodes);
        setEdges(edges);
    }, [graph]);

    return (
        <div className={rootStyle}>
            <ReactFlow
                fitView={true}
                colorMode={type}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
            >
                <Controls />
                <MiniMap />
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
        </div>
    );
};
