import * as React from 'react'

import { INodeBlockProps } from './NodeBlock.d'
import { NodeBlockContainer } from './style.NodeBlock'

const NodeBlock = (props: INodeBlockProps) => {

    const {title, state} = props

    return (
        <NodeBlockContainer>
            <div className="title">
                {title}
            </div>
            <div className={`status ${state?.toLowerCase()}`}>
                {state}
            </div>
        </NodeBlockContainer>
    )
}

export default NodeBlock;