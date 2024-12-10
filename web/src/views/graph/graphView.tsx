import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { Form } from './components/form';
import { Graph } from './components/graph';

export const useGraphViewStyles = makeStyles({
    rootStyle: {
        height: '100vh',
        width: '100wh',
        display: 'flex',
        flexDirection: 'row',
    },
});

export const GraphView: React.FC = () => {
    const { rootStyle } = useGraphViewStyles();

    return (
        <div className={rootStyle}>
            <Form />
            <Graph />
        </div>
    );
};
