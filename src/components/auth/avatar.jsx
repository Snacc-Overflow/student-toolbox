"use client"

import { useSession } from "next-auth/react"
import Blockies from "react-blockies"
import styles from "./auth.module.scss"

export default function Avatar({ size }) {
  const session = useSession()

  if (!(session.status === "authenticated") || !session.data.user) {
    return null
  }

  return (
    <Blockies
      seed={session.data.user.name}
      scale={size / 8}
      className={styles.avatar}
    />
  )
}
