import * as React from 'react'

import { IIssueDescriber } from './IssueDescriber.d'
import { IssueDescribeContainer } from './style.IssueDescriber'

const IssueDescriber = (props: IIssueDescriber) => {

    const {bodyHTML, title, state} = props

    return (
        <IssueDescribeContainer>
            <h1>{title}</h1>
            <div className={`status ${state?.toLowerCase()}`}>
                {state}
            </div>
            <p>
                <div className="body" dangerouslySetInnerHTML={{__html: bodyHTML}} />
            </p>
        </IssueDescribeContainer>
    )
}

export default IssueDescriber;