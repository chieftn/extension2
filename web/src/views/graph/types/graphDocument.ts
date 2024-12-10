export type OperatorType = 'Source' | 'Sink' | 'Branch' | 'Exchange' | 'Map' | 'Filter' | 'Inspect' | 'Concatenate';

export interface Operator {
    id: string;
    operator: OperatorType;
    ['function']: string;
}

export interface Edge {
    from: string;
}
