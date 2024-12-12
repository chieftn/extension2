import * as React from 'react';
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import { makeStyles, tokens } from '@fluentui/react-components';
import { nodeHeight, nodeWidth } from '../utils/layoutUtils';
import type { Operator } from '../types/graphSchema';

type OperatorNode = Node<Operator>;

const useCanvasNodeStyles = makeStyles({
    rootStyle: {
        display: 'flex',
        width: `${nodeWidth}px`,
        height: `${nodeHeight}px`,
        backgroundColor: tokens.colorNeutralBackground1,
        boxShadow: tokens.shadow4,
        border: `2px solid ${tokens.colorNeutralStroke1}`,
        borderRadius: tokens.borderRadiusMedium,
    },
    internalStyle: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
});

export const CanvasNode: React.FC<NodeProps<OperatorNode>> = ({ data }) => {
    const { rootStyle, internalStyle } = useCanvasNodeStyles();
    return (
        <div className={rootStyle}>
            <Handle type="target" position={Position.Top} />
            <div className={internalStyle}>{data.id}</div>
            <Handle type="source" position={Position.Bottom} id="a" />
        </div>
    );
};
