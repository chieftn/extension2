import { parse, stringify } from 'yaml';
import { graphSchema, GraphError, type Graph } from '../types/graph';

export const parseGraph = (text?: string): Graph => {
    if (!text) {
        return getEmptyGraph();
    }

    const graphObject = getGraphObjectFromYaml(text);
    return validateGraphObject(graphObject);
};

export const serializeGraph = (graph: Graph): string => {
    return stringify(graph);
};

export const getGraphObjectFromYaml = (text: string): object => {
    try {
        return parse(text);
    } catch (e) {
        throw new GraphError(e.message, 'object');
    }
};

export const validateGraphObject = (object: any): Graph => {
    try {
        return graphSchema.parse(object);
    } catch (e) {
        console.log(e);
        throw new GraphError(e.message, 'schema');
    }
};

export const getEmptyGraph = (): Graph => ({
    operators: [],
    edges: [],
});
