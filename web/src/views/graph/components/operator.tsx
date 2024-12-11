import * as React from 'react';
import { OperatorFunction } from './operatorFunction';
import { OperatorId } from './operatorId';
import { OperatorTarget } from './operatorTarget';
import { OperatorType } from './operatorType';

export interface OperatorProps {}
export const Operator: React.FC<OperatorProps> = ({}) => {
    return (
        <div>
            <OperatorId />
            <OperatorType />
            <OperatorFunction />
            <OperatorTarget />
        </div>
    );
};
