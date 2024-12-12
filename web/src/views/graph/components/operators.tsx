import * as React from 'react';
import { makeStyles, tokens } from '@fluentui/react-components';
import { useGraphContext } from '../hooks/useGraph';
import { OperatorEdit } from './operatorEdit';
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
    const { graph, graphError, update } = useGraphContext();

    if (graphError) {
        return <div>Todo decorate: {graphError.message}</div>;
    }

    return (
        <div className={rootStyle}>
            <div className={operatorStyle}>
                {graph?.operators?.map((s) => (
                    <OperatorEdit operator={s} graph={graph} update={update} />
                ))}
            </div>
            <OperatorAdd />
        </div>
    );
};
