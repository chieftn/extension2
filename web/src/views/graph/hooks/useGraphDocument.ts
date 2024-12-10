import { useDocument } from '@/shared/hooks/useDocument';
import { Operator, Edge } from '../types/graphDocument';

export interface GraphDocumentState {
    operators: Operator[];
    edges: Edge[];
}

export const useGraphDocument = (): GraphDocumentState => {
    const { text } = useDocument();
    console.log(text);
    return {
        operators: [],
        edges: [],
    };
};
