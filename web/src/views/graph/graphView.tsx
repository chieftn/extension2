import * as React from 'react';
// import { useGraph } from './hooks/useGraph';
import { useDocument } from '@/shared/hooks/useDocument';

export const GraphView: React.FC = () => {
    // const {} = useGraph();
    const { text } = useDocument();
    return <div>{text}</div>;
};
