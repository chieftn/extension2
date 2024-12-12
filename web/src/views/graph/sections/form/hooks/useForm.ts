import { useMemo, createContext, useContext } from 'react';
import { useDocumentContext } from '@/shared/hooks/useDocument';
import { parseForm, serializeForm } from '../utils/formUtils';
import type { Form, FormError } from '../types/formSchema';

export interface FormContext {
    form?: Form;
    formError?: FormError;
    update: (graph: Form) => void;
}
export const useForm = (): FormContext => {
    const { text, update } = useDocumentContext();

    const [form, formError] = useMemo(() => {
        try {
            const form = parseForm(text);
            return [form, undefined];
        } catch (e) {
            return [undefined, e];
        }
    }, [text]);

    return {
        form,
        formError,
        update: (updatedForm) => {
            if (updatedForm) {
                const formText = serializeForm(updatedForm);
                update(formText);
            }
        },
    };
};

export const FormContext = createContext<FormContext | undefined>(undefined);
export const useFormContext = () => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error('missing form context');
    }

    return context;
};
