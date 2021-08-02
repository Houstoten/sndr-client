import React, { useEffect, useState } from "react";
import { UserCard } from '../atoms/UserCard';
import { useAuthState } from '../context/AuthContext/hooks/useAuthState';
import { useRouter } from 'next/router';
import { Box, Divider, Flex, Input, InputGroup, InputLeftElement, Spinner, Text } from '@chakra-ui/react';
import { useSendGeolocation } from '../context/PeopleAroundContext/hooks/useSendGeolocation';
import { useNearestUsers } from '../context/PeopleAroundContext/hooks/useNearestUsers';
import { getServerSideAuth } from '../utils/serverSideAuthChecker';
import { useRecentContacts } from '../context/PeopleAroundContext/hooks/useRecentContacts';
import { useFindUsers } from '../context/PeopleAroundContext/hooks/useSearchUsers';
import useDebouncedEffect from 'use-debounced-effect-hook'
import { SearchIcon } from 'chakra-ui-ionicons';
import { DefaultDropDown } from '../components/SearchDropdown/DefaultDropdown';
import { SearchDropDown } from '../components/SearchDropdown/SearchDropdown';

const colorArr = ["#71bfbc", "#ffa951", "#47afd6", "#a24ee9"]

export const getServerSideProps = getServerSideAuth('/hello', true)

function Home() {

  const { signedIn } = useAuthState()

  const router = useRouter()

  const { peopleAround, getNearestUsers } = useNearestUsers();

  const { updatedat, sendGeolocation } = useSendGeolocation()

  const { findUsers, foundUsers, resetFound, loading: searchLoading } = useFindUsers()

  const [input, setInput] = useState();
  const [focused, setFocused] = useState(false);

  const { recentContacts, loadRecentContacts } = useRecentContacts()

  useEffect(() => { loadRecentContacts() }, [])

  useEffect(() => {
    signedIn && sendGeolocation()
  }, [signedIn])

  useEffect(() => {
    updatedat !== null && signedIn && getNearestUsers()
  }, [updatedat])

  const handleChange = (event) => setInput(event.target.value)

  const handleFocus = () => setFocused(true)

  const handleBlur = () => setTimeout(() => setFocused(false), 300)

  useDebouncedEffect(() => {
    input && findUsers({ variables: { input: { search: input } } })
  }, [input], 300)

  useEffect(() => {
    !input && resetFound()
  }, [input])

  return (
    <Flex justify="center" mt="35px" mb="100px">
      <Flex alignItems="center" w="1140px" justify="center" direction="column">
        <Text fontWeight="700" fontSize="26px" color="#041820">Select user to send files</Text>
        <Flex justify='space-between' mt="55px" w="100%">
          <Flex direction='column' justify="center" w="50%">
            <Text ml="7px" fontWeight="700" fontSize="22px" color="#041820">Online users around</Text>

            <Flex direction="column"
              mt="25px"
              style={{ gap: "15px" }}
              maxHeight="458px"
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
          <Flex direction='column' justify="center" alignSelf="flex-start">
            <Text textAlign="center" fontWeight="700" fontSize="22px" color="#041820">Search by email or name</Text>
            <Box w="445px"
              maxHeight="458px"
              m="auto"
              mt="34px"
              border="1px solid transparent"
              borderRadius="10px"
              position="relative"
              background="#fff"
              _before={{
                content: '""',
                position: "absolute",
                top: "-3.5px",
                bottom: "-3.5px",
                left: "-3.5px",
                right: "-3.5px",
                borderRadius: "13px",
                background: "linear-gradient(rgba(33,99,131,1) 0%, rgba(54,124,157,1) 50%, rgba(113,191,188,1) 100%)",
                zIndex: -1
              }}>
              <InputGroup h="46px">
                <InputLeftElement pointerEvents="none" ml="20px" h="100%" w='fit-content'>
                  {searchLoading ? <Spinner color="#272727" /> : <SearchIcon boxSize="20px" color="#272727" />}
                </InputLeftElement>
                <Input
                  placeholder="Search users..."
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  pl="56px"
                  h="100%"
                  border="0px"
                  _focus={{
                    boxShadow: "none !important"
                  }} />
              </InputGroup>
              {focused && (foundUsers || !input) && <Divider background="#d2d2d2" height="0.5px" />}
              {focused && !input && !foundUsers && <DefaultDropDown recent={recentContacts} />}
              {focused && input && foundUsers && <SearchDropDown foundUsers={foundUsers} />}
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Flex>

  )
}

export default Home