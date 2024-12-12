import { useMemo, createContext, useContext } from 'react';
import { useDocument } from '@/shared/hooks/useDocument';
import { parseForm, serializeForm } from '../utils/parseUtils';
import type { Form, FormError } from '../types/graph';

export interface FormContext {
    graph?: Form;
    graphError?: FormError;
    update: (graph: Form) => void;
}

export const useForm = (): FormContext => {
    const { text, update } = useDocument();

    const [graph, graphError] = useMemo(() => {
        try {
            const graph = parseForm(text);
            return [graph, undefined];
        } catch (e) {
            return [undefined, e];
        }
    }, [text]);

    return {
        graph,
        graphError,
        update: (updatedForm) => {
            if (updatedForm) {
                console.log('updating!!!!');
                const graphText = serializeForm(updatedForm);
                console.log(graphText);
                update(graphText);
            }
        },
    };
};

export const FormContext = createContext<FormContext | undefined>(undefined);
export const useFormContext = () => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error('missing graph context');
    }

    return context;
};
