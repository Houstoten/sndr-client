import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"
import { GetServerSidePropsContext } from "next"
import { GetUserDataDocument, GetUserDataQuery } from "../generated/graphql"

export const getServerSideAuth = (fallbackURL: string, fallbackIfNoUser: boolean) => async (
    context: GetServerSidePropsContext
) => {
    const client = new ApolloClient({
        link: new HttpLink({ uri: 'http://localhost:4000/graphql', headers: context?.req?.headers }),
        cache: new InMemoryCache()
    })

    try {
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
    } catch {

        return {
            props: {},
            redirect: fallbackIfNoUser && {
                destination: fallbackURL,
                permanent: false,
            },
        }
    }
}