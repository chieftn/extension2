import * as React from 'react';
import { OperatorFunction } from './fieldFunction';
import { OperatorId } from './fieldId';
import { OperatorTarget } from './fieldTarget';
import { OperatorType } from './fieldType';
import { OperatorRemove } from './operatorRemove';
import type { Form, Operator } from '../types/formSchema';

export interface OperatorDetailsProps {
    form: Form;
    operator: Operator;
    update(form: Form): void;
}
export const OperatorDetails: React.FC<OperatorDetailsProps> = ({ form, operator, update }) => {
    const onUpdateID = (value: string) => {
        const updatedGraph = { ...form };
        updatedGraph.operators = updatedGraph.operators?.map((s) => {
            if (s.id?.toString() !== operator.id?.toString()) {
                return s;
            }

            return { ...s, id: value };
        });

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
