import * as React from 'react';
// import { useGraph } from './hooks/useGraph';
import { useDocument } from '@/shared/hooks/useDocument';
import { Field, Input, type InputOnChangeData } from '@fluentui/react-components';
import { Graph } from './components/graph';

export const GraphView: React.FC = () => {
    // const {} = useGraph();
    const { text, update } = useDocument();

    const onChange = (ev: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
        update(data.value);
    };

    return (
        <>
            <div>{text}</div>

            <Field label="Contents">
                <Input placeholder={'contents'} value={text || ''} onChange={onChange} />
            </Field>

            <Graph />
        </>
    );
};
