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
    useReactFlow,
    Node,
    Edge,
    MarkerType,
} from '@xyflow/react';
import { useThemeContext } from '@/shared/hooks/useTheme';
import { useGraphContext } from '../hooks/useGraph';
import { getLayoutedElements, nodeWidth, nodeHeight } from '../utils/layoutUtils';
import '@xyflow/react/dist/style.css';

export const useCanvasStyles = makeStyles({
    rootStyle: {
        width: '100%',
        height: '100%',
    },
});
export const Canvas: React.FC = () => {
    const { rootStyle } = useCanvasStyles();
    const { type } = useThemeContext();
    const { graph } = useGraphContext();
    const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<any>([]);
    const { fitView } = useReactFlow();

    React.useEffect(() => {
        const nodes: Node[] =
            graph?.operators.map((s) => ({
                id: s.id.toString(),
                position: { x: 0, y: 0 },
                data: { ...s, label: s.id.toString() },
                height: nodeHeight,
                width: nodeWidth,
            })) || [];

        const edges: Edge[] =
            graph?.edges.map((s) => ({
                source: s.from.toString(),
                target: s.to.toString(),
                id: `${s.from}-${s.to}`,
                markerEnd: { type: MarkerType.ArrowClosed },
            })) || [];

        const layout = getLayoutedElements(nodes, edges);
        setNodes([...layout.nodes]);
        setEdges([...layout.edges]);

        window.requestAnimationFrame(() => {
            fitView();
        });
    }, [graph]);

    return (
        <div className={rootStyle}>
            <ReactFlow
                fitView={true}
                colorMode={type}
                nodes={nodes}
                edges={edges}
                nodesConnectable={false}
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
