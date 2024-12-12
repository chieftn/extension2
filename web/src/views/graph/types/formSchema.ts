import { z } from 'zod';

export const operatorFormSchema = z.object({
    id: z.string().or(z.number()).optional(),
    function: z.string().optional(),
    operator: z.string().optional(),
});

export const edgeFormSchema = z.object({
    to: z.string().or(z.number()).optional(),
    from: z.string().or(z.number()).optional(),
    label: z.string().optional(),
});

export const formSchema = z.object({
    operators: operatorFormSchema.array().optional(),
    edges: edgeFormSchema.array().optional(),
});

export type OperatorForm = z.infer<typeof operatorFormSchema>;
export type EdgeForm = z.infer<typeof edgeFormSchema>;
export type Form = z.infer<typeof formSchema>;

export class FormError extends Error {
    public type: 'object' | 'schema' = 'object';
    constructor(message: string, type: 'object' | 'schema') {
        super(message);
        this.type = 'object';
    }
}
