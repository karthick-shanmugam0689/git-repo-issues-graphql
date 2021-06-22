import * as React from 'react'
import classNames from 'classnames'
import { Link } from "react-router-dom";

import { useApolloClient, ApolloClient } from '@apollo/client'

import { INodeBlockProps } from './NodeBlock.d'
import { NodeBlockContainer } from './style.NodeBlock'
import { getScrollOptions } from '../../queries/filter'

const NodeBlock = (props: INodeBlockProps) => {

    const {id, title, state, bodyHTML, wrapBody, showDetailLink} = props

    const [showAllInBody, setShowAllInBody] = React.useState(false);

    const client: ApolloClient<any> = useApolloClient()

    const handleShowMore = () => {
        setShowAllInBody(!showAllInBody)
    }

    const handleWriteToScroll  = () => {
        if(showDetailLink) {
            client.writeQuery({
                query: getScrollOptions,
                data: {
                    scroll: {
                        id,
                    }
                },
                broadcast: true
            })
        }
    }

    return (
        <NodeBlockContainer id={id}>
            <div className="title">
                {title}
            </div>
            <div className={`status ${state?.toLowerCase()}`}>
                {state}
            </div>
            <p className={classNames("body", {'wrap-lines': wrapBody && !showAllInBody})} dangerouslySetInnerHTML={{__html: bodyHTML}} />
            {
                showDetailLink && (
                    <Link className="to-issue" to={`/issue/${id}`} onClick={handleWriteToScroll}>
                        Click Here
                    </Link>
                )
            }
            {
                showDetailLink && (
                    <button className="show-more" onClick={handleShowMore} >
                        Show {showAllInBody ? 'Less': 'More'}
                    </button>
                )
            }
        </NodeBlockContainer>
    )
}

export default NodeBlock;