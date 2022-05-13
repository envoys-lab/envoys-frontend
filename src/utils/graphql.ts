import { GRAPH_API_EXCHANGE } from 'config/constants/endpoints'
import { GraphQLClient } from 'graphql-request'

// Extra headers
// Mostly for dev environment
// No production env check since production preview might also need them
export const getGQLHeaders = (endpoint: string) => {
  // if (endpoint === GRAPH_API_EXCHANGE) {
  //   return { 'X-Sf': process.env.NEXT_PUBLIC_SF_HEADER }
  // }
  return undefined
}

export const infoClient = new GraphQLClient(GRAPH_API_EXCHANGE, { headers: getGQLHeaders(GRAPH_API_EXCHANGE) })
