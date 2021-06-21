export interface IPageInfo {
    endCursor: string
    hasNextPage: boolean
}

export interface IList {
    pageInfo: IPageInfo
}

export interface INode {
    id: string
    bodyHTML: string
}

export interface ICommentList extends IList {
    totalCount: number
    nodes: INode[]
}

export interface IIssue extends INode {
    title: string
    state: string
}

export interface IIssueNode {
    node: IIssue
}

export interface IIssueList extends IList {
    issueCount: number
    edges: [IIssueNode]
}

export interface IIssuesSearch {
    search: IIssueList
}