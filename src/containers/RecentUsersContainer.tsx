import { List, ListItem } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React from "react"
import { UserCard } from "../atoms/UserCard"

export const RecentUsersContainer = ({ recentContacts }: any) => {
    const router = useRouter()

    return <List spacing={3}>
        {recentContacts.map(
            ({ id, name, email, image, online }: any) =>
                <ListItem key={id}>
                    <UserCard
                        key={email}
                        name={name}
                        email={email}
                        image={image}
                        online={online}
                        onClick={() => router.push(`/user/send/${id}`)}
                    />
                </ListItem>)}
    </List>
}