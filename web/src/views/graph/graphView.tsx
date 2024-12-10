import * as React from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { makeStyles } from '@fluentui/react-components';
import { Form } from './components/form';
import { Graph } from './components/graph';

export const useGraphViewStyles = makeStyles({
    rootStyle: {
        height: '100vh',
        width: '100wh',
    },
});

export const GraphView: React.FC = () => {
    const { rootStyle } = useGraphViewStyles();

    return (
        <div className={rootStyle}>
            <PanelGroup direction={'horizontal'}>
                <Panel style={{ overflow: 'auto' }}>
                    <Form />
                </Panel>
                <PanelResizeHandle />
                <Panel defaultSize={40}>
                    <Graph />
                </Panel>
            </PanelGroup>
        </div>
    );
};
