import * as React from 'react';
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import { makeStyles, tokens } from '@fluentui/react-components';
import { nodeHeight, nodeWidth } from '../utils/layoutUtils';
import type { Operator } from '../types/graphSchema';

type OperatorNode = Node<Operator>;

const useCanvasNodeStyles = makeStyles({
    rootStyle: {
        backgroundColor: tokens.colorNeutralBackground1,
        border: `2px solid ${tokens.colorNeutralStroke1}`,
        borderRadius: tokens.borderRadiusMedium,
        boxShadow: tokens.shadow4,
        height: `${nodeHeight}px`,
        overflow: 'hidden',
        width: `${nodeWidth}px`,
    },
    bodyStyle: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    nameStyle: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        paddingInline: tokens.spacingHorizontalS,
        whiteSpace: 'nowrap',
    },
});

export const CanvasNode: React.FC<NodeProps<OperatorNode>> = ({ data }) => {
    const { rootStyle, bodyStyle, nameStyle } = useCanvasNodeStyles();
    return (
        <div className={rootStyle}>
            <Handle type="target" position={Position.Top} />
            <div className={bodyStyle}>
                <div className={nameStyle}>{data.id}</div>
            </div>
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
};
