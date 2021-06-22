import * as React from 'react'

import { useQuery } from '@apollo/client'

import { getIssues } from '../../../../queries/issues'
import { IIssueNode, IIssuesSearch } from '../../../../types/issues.d'
import { IIssuesListProps } from './IssuesContainer.d'
import { IssuesListContainer } from './style.IssuesContainer'
import NodeBlock from '../../../../components/NodeBlock/NodeBlock'
import { IScroll } from '../../../../types/filter.d'
import { getScrollOptions } from '../../../../queries/filter'

const IssuesList = (props: IIssuesListProps) => {

    const { searchTerm, status } = props

    const { data: scrollData } = useQuery<IScroll, any>(getScrollOptions)

    React.useLayoutEffect(
        () => {
            if(scrollData?.scroll?.id) {
                document.getElementById(scrollData.scroll.id)?.scrollIntoView({block: 'center', inline: 'center'})
            }
        },
        [scrollData]
    )

    const { data, loading, error, fetchMore } = useQuery<IIssuesSearch, any>(getIssues, {
        variables: {
            query: `repo:facebook/react state:${status || ''} type:issue in:title ${searchTerm || ''} in:body ${searchTerm || ''}`,
            after: null,
        },
    })

    const handleClickShowMore = () => {
        fetchMore({
            variables: {
              after: data?.search?.pageInfo?.endCursor,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                let edges: IIssueNode[] = prev?.search?.edges || []
                edges = fetchMoreResult?.search?.edges ?  edges.concat(fetchMoreResult?.search?.edges) : edges
                return {
                    search: {
                        ...fetchMoreResult?.search,
                        edges
                    }
                }
            }
        })
    }

    if(loading) {
        return (
            <>
                Fetching issues. Please wait...
            </>
        )
    }

    if(error) {
        return (
            <>
                {`Some error happened, ${error.message}`}
            </>
        )
    }

    return (
        <IssuesListContainer>
            {(data?.search?.issueCount || 0) > 0 ? (
                <>
                    <div className="total-count">
                        {
                            `Showing ${data?.search?.edges?.length} in ${data?.search?.issueCount || 0} issue(s) found`
                        }
                    </div>
                    {
                        data?.search?.edges && data?.search?.edges.map(edge => (
                            <NodeBlock {...edge.node} wrapBody={true} key={edge.node.id} showDetailLink={true} />
                        ))
                    }
                    {
                        data?.search?.pageInfo?.hasNextPage && (
                            <button className="show-more" onClick={handleClickShowMore}>Show More</button>
                        )
                    }
                </>
            ) : (
                <div className="total-count">
                    No issues yet with the search criteria. Try changing the search and try again
                </div>
            )}
        </IssuesListContainer>
    )
}

export default IssuesList