import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useEffect } from "react";
import { usePeopleAround } from '../context/PeopleAroundContext/hooks/usePeopleAround';
import { UserCard } from '../atoms/UserCard';
import { useAuthState } from '../context/AuthContext/hooks/useAuthState';
import * as R from 'rambda'
import { Heading } from '@chakra-ui/layout';
import { useRouter } from 'next/router';
import { GridLayoutContainer } from '../containers/GridLayoutContainer';
import { LiveUsersContainer } from '../containers/LiveUsersContainer';

function Home() {

  const { signedIn } = useAuthState()

  const { peopleAround, sendCurrentPosition, loadPeopleAround, currentPositionUpdatedAt } = usePeopleAround();

  const router = useRouter()

  useEffect(() => {
    signedIn && sendCurrentPosition()
  }, [signedIn])

  useEffect(() => {
    currentPositionUpdatedAt !== null && signedIn && loadPeopleAround()
  }, [currentPositionUpdatedAt])

  const liveUsersContainer = <LiveUsersContainer peopleAround={peopleAround} />

  const searchForAnyUser = <Heading>Still in dev!</Heading>
  return (
    <div className={styles.container}>
      {R.isEmpty(peopleAround) && <Heading>It`s too quite here... Wait for somebody to join!</Heading>}
      <GridLayoutContainer
        left={liveUsersContainer}
        right={searchForAnyUser}
      />
    </div>
  )
}

export default Home