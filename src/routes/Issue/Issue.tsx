import * as React from 'react'
import IssueContainer from './components/IssueContainer/IssueContainer'
import { IIssueProps } from './Issue.d'

const Issue = (props: IIssueProps) => {

    const { issueId } = props.match.params

    React.useLayoutEffect(
        () => {
            window.scrollTo(0, 0)
        },
        []
    )
    
    return (
        <>
            <IssueContainer issueId={issueId} />
        </>
    )
}

export default Issue