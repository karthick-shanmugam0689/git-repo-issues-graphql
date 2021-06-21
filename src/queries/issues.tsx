import { gql } from '@apollo/client'

export const issuesTypeDefs = gql `
    type PageInfo {
        endCursor: String
        hasNextPage: Boolean
    }
    type List {
        pageInfo: PageInfo
    }
    type Node {
        id: String
        bodyHTML: String
    }
    type Comment implements Node
    type CommentList implements List {
        totalCount: Int
        nodes: [Comment]
    }
    type Issue implements Node {
        title: String
        comments: CommentList
    }
    type IssueNode {
        node: Issue
    }
    type IssueList implements List {
        issueCount: Int
        edges: [IssueNode]
        pageInfo: PageInfo
    }
    type Filter {
        searchTerm: String
        status: String
    }
    extend type Query {
        search : IssueList
        filter: Filter
    }
`

const pageInfoFragment = gql `
    fragment PageInfoFragment on PageInfo {
        endCursor
        hasNextPage
    }
`

export const getIssues = gql `
    query Issues(
        $query: String!
        $after: String
    ) {
        search(
            first: 10
            type: ISSUE
            query: $query
            after: $after
        ) {
            issueCount
            pageInfo {
                ...PageInfoFragment
            }
            edges {
                node {
                    ... on Issue {
                        id
                        bodyHTML
                        state
                        title
                    }
                }
            }
        }
    }
    ${pageInfoFragment}
`


export const getCommentsOnIssues = gql `
    query(
        $after: String
        $id: String
    ) {
        node(
            id: $id
        ) {
            ... on Issue {
                comments(
                    first: 10
                    after: $after
                ) {
                    totalCount
                    pageInfo {
                        ...PageInfoFragment
                    }
                    nodes {
                        id
                        bodyHTML
                    }
                }
            }
        }
    }
    ${pageInfoFragment}
`