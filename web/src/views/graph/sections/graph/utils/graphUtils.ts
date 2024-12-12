import { parse } from 'yaml';
import { graphSchema, GraphError, type Graph } from '../types/graphSchema';

export const parseGraph = (text?: string): Graph => {
    if (!text) {
        return getEmptyGraph();
    }

    const graphObject = getGraphObjectFromYaml(text);
    const parsedGraphObject = validateGraphObject(graphObject);

    return parsedGraphObject;
};

export const getGraphObjectFromYaml = (text: string): Graph => {
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
        throw new GraphError(e.message, 'schema');
    }
};

export const getEmptyGraph = (): Graph => ({
    operators: [],
    edges: [],
});
