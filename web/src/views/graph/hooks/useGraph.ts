import { useDocument } from '@/shared/hooks/useDocument';

export interface GraphState {}

export const useGraph = (): GraphState => {
    const { text } = useDocument();
    console.log(text);
    return {};
};
