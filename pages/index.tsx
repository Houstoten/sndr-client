import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useEffect } from "react";
import { usePeopleAround } from '../context/PeopleAroundContext/hooks/usePeopleAround';
import { UserCard } from '../atoms/UserCard';
import { useAuthState } from '../context/AuthContext/hooks/useAuthState';
import { useLivePeopleAround } from '../context/PeopleAroundContext/hooks/useLivePeopleAround';
import { useNewConnect } from '../context/PeopleAroundContext/hooks/useNewConnect';

export default function Home() {

  const { signedIn } = useAuthState()

  const { peopleAround, sendCurrentPosition, loadPeopleAround, currentPositionUpdatedAt } = usePeopleAround();

  useLivePeopleAround()
  useNewConnect()
  
  useEffect(() => {
    signedIn && sendCurrentPosition()
  }, [signedIn])

  useEffect(() => {
    currentPositionUpdatedAt !== null && signedIn && loadPeopleAround()
  }, [currentPositionUpdatedAt])

  return (
    <div className={styles.container}>
      {peopleAround.map(
        ({ name, email, image, distance }: any) => <UserCard key={email} name={name} email={email} image={image} distance={distance} />)}
    </div>
  )
}
