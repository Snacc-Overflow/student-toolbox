"use client"

import Blockies from "react-blockies"
import styles from "./auth.module.scss"

export default function Avatar({ size, username }) {
  return <Blockies seed={username} scale={size / 8} className={styles.avatar} />
}
