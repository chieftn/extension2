import { z } from 'zod';

export const operatorSchema = z.object({
    id: z.string().or(z.number()).optional(),
    function: z.string().optional(),
    operator: z.string().optional(),
});

export const edgeSchema = z.object({
    to: z.string().or(z.number()).optional(),
    from: z.string().or(z.number()).optional(),
    label: z.string().optional(),
});

export const formSchema = z.object({
    operators: operatorSchema.array().optional(),
    edges: edgeSchema.array().optional(),
});

export type Operator = z.infer<typeof operatorSchema>;
export type Edge = z.infer<typeof edgeSchema>;
export type Form = z.infer<typeof formSchema>;

export class FormError extends Error {
    public type: 'object' | 'schema' = 'object';
    constructor(message: string, type: 'object' | 'schema') {
        super(message);
        this.type = 'object';
    }
}
