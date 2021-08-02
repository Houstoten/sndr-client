import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { UserCardSearch } from "../../atoms/UserCardSearch";

export const DefaultDropDown = ({ recent }: { recent: { id: string, name: string, email: string, image: string, online: boolean }[] }) => (
    <Flex direction="column" pt="15px" pr="20px" pl="20px" pb="25px">
      <Text fontSize="14px" color="#4e4e4e">Recent</Text>
      <Flex ml="5px" mt="15px" style={{ gap: "30px" }}>
        {recent.map(user => (
          <UserCardSearch key={user.email} {...user} />
        ))}
      </Flex>
    </Flex>
  )