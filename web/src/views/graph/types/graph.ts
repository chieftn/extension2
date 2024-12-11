import { z } from 'zod';

export const operatorTypeSchema = z.enum([
    'Source',
    'Sink',
    'Branch',
    'Exchange',
    'Map',
    'Filter',
    'Inspect',
    'Concatenate',
]);

export const operatorSchema = z.object({
    id: z.number(),
    function: z.string(),
    operator: operatorTypeSchema,
});

export const edgeSchema = z.object({
    to: z.number(),
    from: z.number(),
    label: z.string(),
});

export const graphSchema = z.object({
    operators: operatorSchema.array(),
    edges: edgeSchema.array(),
});

export type OperatorType = z.infer<typeof operatorTypeSchema>;
export type Operator = z.infer<typeof operatorSchema>;
export type Edge = z.infer<typeof edgeSchema>;
export type Graph = z.infer<typeof graphSchema>;

export class GraphError extends Error {
    public type: 'object' | 'schema' = 'object';
    constructor(message: string, type: 'object' | 'schema') {
        super(message);
        this.type = 'object';
    }
}
