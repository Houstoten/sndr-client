import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from "@apollo/client"
import { GetServerSidePropsContext } from "next"
import { GetUserDataDocument, GetUserDataQuery, RefreshTokensDocument } from "../generated/graphql"
import { errorLink } from "./apolloLinks";

export const getServerSideAuth = (fallbackURL: string, fallbackIfNoUser: boolean) => async (
    context: GetServerSidePropsContext
) => {
    let client;

    const refreshTokenMutation = () => client.mutate({ mutation: RefreshTokensDocument })
    
    client = new ApolloClient({
        //@ts-ignore
        link: createHttpLink({ uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL, headers: { Cookie: context?.req?.headers?.['cookie'] }}),
        cache: new InMemoryCache()
    })

    try {
        
        //@ts-ignore
        const userData = await client.query<GetUserDataQuery>({
            query: GetUserDataDocument,
        })
        
        const newProps = { userData: userData?.data?.getUserData }

        return {
            props: newProps,
            redirect: !fallbackIfNoUser && {
                destination: fallbackURL,
                permanent: false,
            },
        }
    } catch(e) {
        
        return {
            props: {},
            redirect: fallbackIfNoUser && {
                destination: fallbackURL,
                permanent: false,
            },
        }
    }
}