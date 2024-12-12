import * as React from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { useGraph, GraphContext } from './hooks/useGraph';
import { Canvas } from './components/canvas';

export const Graph: React.FC = () => {
    const graphContext = useGraph();

    if (graphContext.graphError) {
        return <div>Todo decorate: {graphContext.graphError.message}</div>;
    }

    return (
        <ReactFlowProvider>
            <GraphContext.Provider value={graphContext}>
                <Canvas />
            </GraphContext.Provider>
        </ReactFlowProvider>
    );
};
