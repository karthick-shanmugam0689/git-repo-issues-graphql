import { gql } from '@apollo/client'

export const getFilterOptions = gql `
    query {
        filter @client {
            searchTerm
            status
        }
    }
`

export const getScrollOptions = gql `
    query {
        scroll @client {
            id
        }
    }
`