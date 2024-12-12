import { parse, stringify } from 'yaml';
import { formSchema, FormError, type Form } from '../types/formSchema';

export const parseForm = (text?: string): Form => {
    if (!text) {
        return getEmptyForm();
    }

    const formObject = getFormObjectFromYaml(text);
    const parsedGraphObject = validateFormObject(formObject);

    return parsedGraphObject;
};

export const getFormObjectFromYaml = (text: string): Form => {
    try {
        return parse(text);
    } catch (e) {
        throw new FormError(e.message, 'schema');
    }
};

export const validateFormObject = (object: any): Form => {
    try {
        return formSchema.parse(object);
    } catch (e) {
        throw new FormError(e.message, 'schema');
    }
};

export const getEmptyForm = (): Form => ({
    operators: [],
    edges: [],
});

export const serializeForm = (form: Form): string => {
    return stringify(form);
};
