import Dagre from '@dagrejs/dagre';
import { Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

export const nodeWidth = 160;
export const nodeHeight = 30;

export const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
    const dagreGraph = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
    dagreGraph.setGraph({ rankdir: 'vertical' });

    nodes.forEach((node) => {
        if (node.id) {
            dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
        }
    });

    edges.forEach((edge) => {
        if ((edge.source ?? '' !== '') && (edge.target ?? '' !== '')) {
            dagreGraph.setEdge(edge.source, edge.target);
        }
    });

    Dagre.layout(dagreGraph);

    const newNodes = nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        const newNode = {
            ...node,
            targetPosition: 'top',
            sourcePosition: 'bottom',
            // We are shifting the dagre node position (anchor=center center) to the top left
            // so it matches the React Flow node anchor point (top left).
            position: {
                x: nodeWithPosition.x - nodeWidth / 2,
                y: nodeWithPosition.y - nodeHeight / 2,
            },
        };

        return newNode;
    });

    return { nodes: newNodes, edges };
};
