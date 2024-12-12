import * as React from 'react';
import { makeStyles, tokens } from '@fluentui/react-components';
import { OperatorDetails } from './operatorDetails';
import { OperatorAdd } from './operatorAdd';
import { useFormContext } from '../hooks/useForm';

export const useOperatorDetailsStyles = makeStyles({
    rootStyle: {
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacingVerticalXXL,
    },
});
export const OperatorDetailsList: React.FC = () => {
    const { rootStyle } = useOperatorDetailsStyles();
    const { form, update } = useFormContext();

    return (
        <div className={rootStyle}>
            {form?.operators?.map((s) => (
                <OperatorDetails operator={s} form={form} update={update} />
            ))}
            <OperatorAdd />
        </div>
    );
};
