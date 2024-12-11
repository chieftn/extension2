import { useMemo, createContext, useContext } from 'react';
import { useDocument } from '@/shared/hooks/useDocument';
import { parseGraph, serializeGraph } from '../utils/parseUtils';
import type { Graph, GraphError } from '../types/graph';

export interface GraphContext {
    graph?: Graph;
    graphError?: GraphError;
    update: (graph: Graph) => void;
}

export const useGraph = (): GraphContext => {
    const { text, update } = useDocument();

    const [graph, graphError] = useMemo(() => {
        try {
            const graph = parseGraph(text);
            return [graph, undefined];
        } catch (e) {
            return [undefined, e];
        }
    }, [text]);

    return {
        graph,
        graphError,
        update: () => {
            if (graph) {
                const graphText = serializeGraph(graph);
                update(graphText);
            }
        },
    };
};

export const GraphContext = createContext<GraphContext | undefined>(undefined);
export const useGraphContext = () => {
    const context = useContext(GraphContext);
    if (!context) {
        throw new Error('missing graph context');
    }

    return context;
};
