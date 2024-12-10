import * as React from 'react';
import { Field, Input, makeStyles, tokens, type InputOnChangeData } from '@fluentui/react-components';
import { useDocument } from '@/shared/hooks/useDocument';

export const useFormStyles = makeStyles({
    rootStyle: {
        overflowY: 'auto',
        paddingBlockStart: tokens.spacingVerticalL,
        paddingBlockEnd: tokens.spacingVerticalL,
        paddingInline: tokens.spacingHorizontalM,
    },
});

export const Form: React.FC = () => {
    const { rootStyle } = useFormStyles();
    const { text, update } = useDocument();

    const onChange = (ev: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
        update(data.value);
    };

    return (
        <div className={rootStyle}>
            <Field label="Contents">
                <Input placeholder={'contents'} value={text || ''} onChange={onChange} />
            </Field>

            <ul>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
                <li>me</li>
            </ul>
        </div>
    );
};
