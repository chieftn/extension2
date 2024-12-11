import * as React from 'react';
import Dagre from '@dagrejs/dagre';
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
} from '@xyflow/react';
import { useThemeContext } from '@/shared/hooks/useTheme';
import { useGraphContext } from '../hooks/useGraph';
import '@xyflow/react/dist/style.css';

const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
    const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
    g.setGraph({ rankdir: 'vertical', marginy: 500, width: 500, height: 500 });

    edges.forEach((edge) => g.setEdge(edge.source, edge.target));
    nodes.forEach((node) =>
        g.setNode(node.id, {
            ...node,
            width: node.measured?.width ?? 0,
            height: node.measured?.height ?? 0,
        })
    );

    Dagre.layout(g);

    return {
        nodes: nodes.map((node) => {
            const position = g.node(node.id);
            // We are shifting the dagre node position (anchor=center center) to the top left
            // so it matches the React Flow node anchor point (top left).
            const x = position.x - (node.measured?.width ?? 0) / 2;
            const y = position.y - (node.measured?.height ?? 0) / 2;

            return { ...node, position: { x, y } };
        }),
        edges,
    };
};

export const useGraphStyles = makeStyles({
    rootStyle: {
        width: '100%',
        height: '100%',
    },
});
export const Graph: React.FC = () => {
    const { rootStyle } = useGraphStyles();
    const { fitView } = useReactFlow();
    const { type } = useThemeContext();
    const { graph } = useGraphContext();
    const [nodes, setNodes] = useNodesState<any>([]);
    const [edges, setEdges] = useEdgesState<any>([]);

    // React.useEffect(() => {
    //     console.log(nodes);
    //     const layouted = getLayoutedElements(nodes, edges);

    //     setNodes([...layouted.nodes]);
    //     setEdges([...layouted.edges]);

    //     window.requestAnimationFrame(() => {
    //         fitView();
    //     });
    // }, [nodes, edges]);

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

        const layouted = getLayoutedElements(nodes, edges);

        setNodes([...layouted.nodes]);
        setEdges([...layouted.edges]);

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
                // onNodesChange={onNodesChange}
                // onEdgesChange={onEdgesChange}
            >
                <Controls />
                <MiniMap />
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
        </div>
    );
};
