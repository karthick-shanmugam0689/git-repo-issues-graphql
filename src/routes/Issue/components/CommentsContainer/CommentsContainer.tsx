import * as React from 'react'
import NodeBlock from '../../../../components/NodeBlock/NodeBlock'
import { ICommentList } from '../../../../types/issues.d'
import { CommentsListContainer } from './style.CommentsContainer'

const CommentsContainer = (props: ICommentList) => {

    const { totalCount = 0, nodes = [] } = props

    return (
        <CommentsListContainer>
            {totalCount > 0 ? (
                <>
                    <div className="total-count">
                        {
                            `${totalCount} comment(s) found`
                        }
                    </div>
                    {
                        nodes && nodes.map(node => (
                            <NodeBlock {...node} />
                        ))
                    }
                </>
            ) : (
                <div className="total-count">
                    No comments yet for this issue
                </div>
            )}
        </CommentsListContainer>
    )
}

export default CommentsContainer