import * as React from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { makeStyles } from '@fluentui/react-components';
import { useDocument, DocumentContext } from '@/shared/hooks/useDocument';
import { Form } from './sections/form/form';
import { Graph } from './sections/graph/graph';

export const useGraphViewStyles = makeStyles({
    rootStyle: {
        height: '100vh',
        width: '100wh',
    },
});
export const GraphView: React.FC = () => {
    const { rootStyle } = useGraphViewStyles();
    const documentContext = useDocument();

    return (
        <div className={rootStyle}>
            <DocumentContext.Provider value={documentContext}>
                <PanelGroup direction={'horizontal'}>
                    <Panel defaultSize={40} minSize={15} style={{ overflow: 'auto' }}>
                        <Form />
                    </Panel>
                    <PanelResizeHandle />
                    <Panel defaultSize={60} minSize={5}>
                        <Graph />
                    </Panel>
                </PanelGroup>
            </DocumentContext.Provider>
        </div>
    );
};
