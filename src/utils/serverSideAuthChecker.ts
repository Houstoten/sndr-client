import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from "@apollo/client"
import { GetServerSidePropsContext } from "next"
import { GetUserDataDocument, GetUserDataQuery, RefreshTokensDocument } from "../generated/graphql"
import { errorLink } from "./apolloLinks";

export const getServerSideAuth = (fallbackURL: string, fallbackIfNoUser: boolean) => async (
    context: GetServerSidePropsContext
) => {
    let client;

    const refreshTokenMutation = () => client.mutate({ mutation: RefreshTokensDocument })

    console.log(context?.req?.headers);
    
    client = new ApolloClient({
        //@ts-ignore
        link: createHttpLink({ uri: 'https://api.sndr.club/graphql', headers: { Cookie: context?.req?.headers?.['Cookie'] }}),
        cache: new InMemoryCache()
    })

    try {

        console.log('requesting userdata');
        
        //@ts-ignore
        const userData = await client.query<GetUserDataQuery>({
            query: GetUserDataDocument,
        })

        console.log(userData);
        
        const newProps = { userData: userData?.data?.getUserData }

        return {
            props: newProps,
            redirect: !fallbackIfNoUser && {
                destination: fallbackURL,
                permanent: false,
            },
        }
    } catch(e) {

        console.log(e);
        
        return {
            props: {},
            redirect: fallbackIfNoUser && {
                destination: fallbackURL,
                permanent: false,
            },
        }
    }
}