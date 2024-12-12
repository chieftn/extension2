import { useMemo, createContext, useContext } from 'react';
import { useDocumentContext } from '@/shared/hooks/useDocument';
import { parseGraph } from '../utils/graphUtils';
import type { Graph, GraphError } from '../types/graphSchema';

export interface GraphContext {
    graph?: Graph;
    graphError?: GraphError;
}

export const useGraph = (): GraphContext => {
    const { text } = useDocumentContext();

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
