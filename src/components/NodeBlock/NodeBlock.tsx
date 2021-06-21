import * as React from 'react'

import { INodeBlockProps } from './NodeBlock.d'
import { NodeBlockContainer } from './style.NodeBlock'

const NodeBlock = (props: INodeBlockProps) => {

    const {title, state, bodyHTML} = props

    return (
        <NodeBlockContainer>
            <div className="title">
                {title}
            </div>
            <div className={`status ${state?.toLowerCase()}`}>
                {state}
            </div>
            <p className="body" dangerouslySetInnerHTML={{__html: bodyHTML}} />
        </NodeBlockContainer>
    )
}

export default NodeBlock;