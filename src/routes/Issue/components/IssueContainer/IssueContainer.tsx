import * as React from 'react'
import { Link } from "react-router-dom";

import { useQuery } from '@apollo/client'

import { IIssueContainerProps } from './IssueContainer.d';
import { IssueDetailContainer } from './style.IssueContainer';
import { IIssueComments } from '../../../../types/issues.d';
import { getCommentsOnIssue } from '../../../../queries/issues';
import IssueDescriber from '../IssueDescriber/IssueDescriber';
import CommentsContainer from '../CommentsContainer/CommentsContainer';

const IssueContainer = (props: IIssueContainerProps) => {

    const { issueId } = props

    const { data, loading, error } = useQuery<IIssueComments, any>(getCommentsOnIssue, {
        variables: {
            id: issueId
        }
    })

    if(loading) {
        return (
            <>
                Fetching issue. Please wait...
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

    const { title = '', bodyHTML = '', state = '', id = '', comments } = data?.node || {}

    const { totalCount = 0, nodes = [] } = comments || {}

    return (
        <IssueDetailContainer>
            <Link className="back-nav" to="/">
                &lt; Back
            </Link>
            <IssueDescriber title={title} bodyHTML={bodyHTML} state={state} id={id} />
            <CommentsContainer totalCount={totalCount} nodes={nodes} />
        </IssueDetailContainer>
    )
}

export default IssueContainer