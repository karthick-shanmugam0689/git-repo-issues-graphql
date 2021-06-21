import { GITHUB_TOKEN, GRAPHQL_SERVER_URL } from '../constants/graphqlConstants'
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { issuesTypeDefs } from '../queries/issues'
import { setContext } from '@apollo/client/link/context';
import { relayStylePagination } from "@apollo/client/utilities"

export const getClient = () => {
    const httpLink = new HttpLink({
        uri: GRAPHQL_SERVER_URL
    })

    const authLink = setContext((_, { headers }) => {
        return {
          headers: {
            ...headers,
            authorization: `Bearer ${GITHUB_TOKEN}`,
          }
        }
    });

    const cache = new InMemoryCache({
        typePolicies: {
            Query: {
              fields: {
                search: relayStylePagination(),
              },
            },
        }
    })

    // await persistCache({
    //     cache,
    //     storage: window.sessionStorage as any,
    // })

    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache,
        typeDefs: issuesTypeDefs,
    });

    client.onResetStore(async () => {
        await alert('Store flushed out')
    })

    return client
}