import { Flex } from "@chakra-ui/react";
import React from "react";
import { NoResultsPlaceholder } from "../../atoms/NoResultsPlaceholder";
import { UserCardSearchInline } from "../../atoms/UserCardSearchInline";

export const SearchDropDown = ({ foundUsers }: { foundUsers: { id: string, name: string, email: string, image: string, online: boolean }[] }) => (
    foundUsers.length ? <Flex direction="column"
      style={{ gap: "10px" }}
      pt="15px"
      pl="30px"
      pr="30px"
      pb="15px"
      overflowY="auto"
      className="customScrollbar"
    >
      {foundUsers.map(user => <UserCardSearchInline key={user.id} {...user} />)}
    </Flex> : <NoResultsPlaceholder />)
  
  