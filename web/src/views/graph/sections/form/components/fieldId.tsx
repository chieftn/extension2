import * as React from 'react';
import { Field, Input, type InputProps } from '@fluentui/react-components';

export interface OperatorIdProps {
    value: string;
    setValue(value: string): void;
}
export const OperatorId: React.FC<OperatorIdProps> = ({ value, setValue }) => {
    const onChange: InputProps['onChange'] = (ev, data) => {
        setValue(data.value || '');
    };

    return (
        <Field label={'ID'}>
            <Input value={value} onChange={onChange} />
        </Field>
    );
};
