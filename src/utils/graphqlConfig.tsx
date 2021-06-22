import { GRAPHQL_SERVER_URL } from '../constants/graphqlConstants'
import { ApolloClient, InMemoryCache, HttpLink, Reference } from '@apollo/client'
import { issuesTypeDefs } from '../queries/issues'
import { setContext } from '@apollo/client/link/context';

export const getClient = () => {
    const httpLink = new HttpLink({
        uri: GRAPHQL_SERVER_URL
    })

    const authLink = setContext((_, { headers }) => {
        return {
          headers: {
            ...headers,
            authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
          }
        }
    });

    const cache = new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
              node(existingDataFromCache: Reference | undefined, {args, toReference}) {
                const returnE = existingDataFromCache || toReference({
                  __typename: 'Issue',
                  id: args?.id,
              })
              console.log("Hiiii")
              console.log(returnE)
                  return returnE
              },
          }
        }
      },
    });

    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache,
        typeDefs: issuesTypeDefs,
    });

    return client
}