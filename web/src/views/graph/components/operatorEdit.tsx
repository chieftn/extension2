import * as React from 'react';
import { OperatorFunction } from './operatorFunction';
import { OperatorId } from './operatorId';
import { OperatorRemove } from './operatorRemove';
import { OperatorTarget } from './operatorTarget';
import { OperatorType } from './operatorType';
import type { Graph, Operator } from '../types/graph';

export interface OperatorProps {
    graph: Graph;
    operator: Operator;
    update(graph: Graph): void;
}
export const OperatorEdit: React.FC<OperatorProps> = ({ graph, operator, update }) => {
    const onUpdateID = (value: string) => {
        const updatedGraph = { ...graph };
        updatedGraph.operators = updatedGraph.operators?.map((s) => {
            if (s.id?.toString() !== operator.id?.toString()) {
                return s;
            }

            return { ...s, id: value };
        });

        console.log(updatedGraph);
        update(updatedGraph);
    };

    return (
        <div>
            <OperatorId setValue={onUpdateID} value={operator.id?.toString() || ''} />
            <OperatorType />
            <OperatorFunction />
            <OperatorTarget />
            <OperatorRemove />
        </div>
    );
};
