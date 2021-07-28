import Image from 'next/image'
import React, { useEffect } from "react";
import { UserCard } from '../atoms/UserCard';
import { useAuthState } from '../context/AuthContext/hooks/useAuthState';
import { useRouter } from 'next/router';
import { Flex, Text } from '@chakra-ui/react';
import { useSendGeolocation } from '../context/PeopleAroundContext/hooks/useSendGeolocation';
import { useNearestUsers } from '../context/PeopleAroundContext/hooks/useNearestUsers';

const colorArr = ["#71bfbc", "#ffa951", "#47afd6", "#a24ee9"]

function Home() {

  const { signedIn } = useAuthState()

  const router = useRouter()

  const { peopleAround, getNearestUsers } = useNearestUsers();

  const { updatedat, sendGeolocation } = useSendGeolocation()

  //TODO v0.1
  // const { recentContacts, loadRecentContacts } = useRecentContacts()

  //TODO v0.1
  // useEffect(() => { loadRecentContacts() }, [])

  useEffect(() => {
    signedIn && sendGeolocation()
  }, [signedIn])

  useEffect(() => {
    updatedat !== null && signedIn && getNearestUsers()
  }, [updatedat])

  //TODO v0.1
  // const searchForAnyUser = <RecentUsersContainer recentContacts={recentContacts} />

  return (
    <Flex justify="center" mt="35px" mb="100px">
      <Flex alignItems="center" w="1140px" justify="center" direction="column">
        <Text fontWeight="700" fontSize="26px">Select user to send files</Text>
        <Flex justify='space-between' mt="45px" w="100%">
          <Flex direction='column' justify="center" w="50%">
            <Text ml="7px" fontWeight="700" fontSize="22px">Online users around</Text>

            <Flex direction="column"
              mt="25px"
              style={{ gap: "15px" }}
              height="458px"
              width="fit-content"
              overflowY="auto"
              p="7px"
              pr="11px"
              className="customScrollbar"
            >
              {peopleAround.length === 0 && <Text mt="200px" fontSize="16px">If anyone around open this page, you will see him here...</Text>}

              {peopleAround.map((v: any, i: number) => {
                const { id, name, email, image, distance } = v

                let current = i;

                while (current > 3) {
                  current -= 4
                }

                return <UserCard
                  key={id}
                  name={name}
                  email={email}
                  image={image}
                  distance={distance}
                  onClick={() => router.push(`/user/send/${id}`)}
                  badgeColor={colorArr[current]}
                />
              })}
            </Flex>
          </Flex>
          <Flex direction='column' justify="center" w="50%">
            <Text textAlign="center" fontWeight="700" fontSize="22px">Search by email or name (In dev)</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>

  )
}

export default Home