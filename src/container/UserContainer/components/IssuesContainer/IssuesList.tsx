import * as React from 'react'

import { useQuery } from '@apollo/client'

import { getIssues } from '../../../../queries/issues'
import { IIssuesSearch } from '../../../../types/issues.d'
import { IIssuesListProps } from './IssuesContainer.d'
import { IssuesListContainer } from './style.IssuesContainer'
import NodeBlock from '../../../../components/NodeBlock/NodeBlock'

const IssuesList = (props: IIssuesListProps) => {

    const { searchTerm, status } = props

    const { data, loading, error, fetchMore } = useQuery<IIssuesSearch, any>(getIssues, {
        variables: {
            query: `repo:facebook/react state:${status || ''} type:issue in:title ${searchTerm || ''}`,
            after: null,
        }
    })

    const handleClickShowMore = () => {
        fetchMore({
            variables: {
              after: data?.search.pageInfo.endCursor,
            },
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
            <div className="total-count">
                {
                    `Showing ${data?.search?.edges?.length} in ${data?.search?.issueCount || 0} issue(s) found`
                }
            </div>
            {
                data?.search?.edges && data?.search?.edges.map(edge => (
                    <NodeBlock {...edge.node} />
                ))
            }
            {
                data?.search.pageInfo.hasNextPage && (
                    <button className="show-more" onClick={handleClickShowMore}>Show More</button>
                )
            }
        </IssuesListContainer>
    )
}

export default IssuesList