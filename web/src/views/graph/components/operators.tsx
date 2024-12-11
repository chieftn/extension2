import * as React from 'react';
import { makeStyles, tokens } from '@fluentui/react-components';
import { useGraphContext } from '../hooks/useGraph';
import { Operator } from './operator';
import { OperatorAdd } from './operatorAdd';

export const useFormStyles = makeStyles({
    rootStyle: {
        paddingBlockStart: tokens.spacingVerticalL,
        paddingBlockEnd: tokens.spacingVerticalL,
        paddingInline: tokens.spacingHorizontalM,
        minWidth: '240',
    },
    operatorStyle: {
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacingVerticalXXL,
    },
});

export const Operators: React.FC = () => {
    const { rootStyle, operatorStyle } = useFormStyles();
    const { graph, graphError } = useGraphContext();

    if (graphError) {
        return <div>Todo decorate: {graphError.message}</div>;
    }

    return (
        <div className={rootStyle}>
            <div className={operatorStyle}>
                {graph?.operators.map((s) => (
                    <Operator />
                ))}
            </div>
            <OperatorAdd />
        </div>
    );
};
