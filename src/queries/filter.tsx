import { gql } from '@apollo/client'

export const getFilterOptions = gql `
    query {
        filter @client {
            searchTerm
            status
        }
    }
`