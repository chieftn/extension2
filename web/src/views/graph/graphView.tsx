import * as React from 'react';
// import { useGraph } from './hooks/useGraph';
import { useDocument } from '@/shared/hooks/useDocument';
import { Field, Input, type InputOnChangeData } from '@fluentui/react-components';

export const GraphView: React.FC = () => {
    // const {} = useGraph();
    const { text, update, updates } = useDocument();

    const onChange = (ev: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
        update(data.value);
    };

    return (
        <>
            <div>{text}</div>

            <Field label="Contents">
                <Input placeholder={'contents'} value={text || ''} onChange={onChange} />
            </Field>

            <ul>
                {updates.map((update) => (
                    <li>{update}</li>
                ))}
            </ul>
        </>
    );
};
