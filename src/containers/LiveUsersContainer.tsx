import { List, ListItem } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React from "react"
import { UserCard } from "../atoms/UserCard"

export const LiveUsersContainer = ({ peopleAround }: any) => {
    const router = useRouter()

    return <List spacing={3}>
        {peopleAround.map(
            ({ id, name, email, image, distance }: any) =>
                <ListItem key={id}>
                    <UserCard
                        key={email}
                        name={name}
                        email={email}
                        image={image}
                        distance={distance}
                        onClick={() => router.push(`/user/send/${id}`)}
                    />
                </ListItem>)}
    </List>
}