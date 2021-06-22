import * as React from 'react'
import { Link } from "react-router-dom";

import { useQuery } from '@apollo/client'

import { IIssueContainerProps } from './IssueContainer.d';
import { IssueDetailContainer } from './style.IssueContainer';
import { IIssueComments, IIssueNode } from '../../../../types/issues.d';
import { getCommentsOnIssue, getIssue } from '../../../../queries/issues';
import IssueDescriber from '../IssueDescriber/IssueDescriber';
import CommentsContainer from '../CommentsContainer/CommentsContainer';

const IssueContainer = (props: IIssueContainerProps) => {

    const { issueId } = props

    const { data: issueData } = useQuery<IIssueNode, any>(getIssue, {
        variables: {
            id: issueId,
        }
    });

    const { data, loading, error } = useQuery<IIssueComments, any>(getCommentsOnIssue, {
        variables: {
            id: issueId
        }
    })

    if(loading && !issueData) {
        return (
            <>
                Fetching issue details. Please wait...
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

    const { title = '', bodyHTML = '', state = '', comments } = data?.node || {}

    const { totalCount = 0, nodes = [] } = comments || {}

    const { title: issueTitle = '', bodyHTML: issueBody = '', state: issueState = '' } = issueData?.node || {}

    return (
        <IssueDetailContainer>
            <Link className="back-nav" to="/">
                &lt; Back
            </Link>
            <IssueDescriber title={title || issueTitle} bodyHTML={bodyHTML || issueBody} state={state || issueState} id={issueId} />
            {
                loading ? (
                    <>
                        Fetching comments. Please wait...
                    </>
                ) : (
                    <CommentsContainer totalCount={totalCount} nodes={nodes} />
                )
            }
        </IssueDetailContainer>
    )
}

export default IssueContainer