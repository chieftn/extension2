import * as React from 'react';
import { makeStyles, tokens } from '@fluentui/react-components';
import { useForm, FormContext } from './hooks/useForm';
import { OperatorDetailsList } from './components/operatorDetailsList';

export const useFormStyles = makeStyles({
    rootStyle: {
        paddingBlockStart: tokens.spacingVerticalL,
        paddingBlockEnd: tokens.spacingVerticalL,
        paddingInline: tokens.spacingHorizontalM,
        minWidth: '240',
    },
});

export const Form: React.FC = () => {
    const { rootStyle } = useFormStyles();
    const formContext = useForm();

    if (formContext.formError) {
        return <div>Todo decorate: {formContext.formError.message}</div>;
    }

    return (
        <div className={rootStyle}>
            <FormContext.Provider value={formContext}>
                <OperatorDetailsList />
            </FormContext.Provider>
        </div>
    );
};
