import Avatar from "@/components/auth/avatar"
import { SessionProvider } from "next-auth/react"
import Header from "../components/header"
import "./globals.css"
import styles from "./page.module.scss"

export const metadata = {
  title: "Student Toolbox",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <div className={styles.avatar}>
            <Avatar size={48} />
          </div>
          <Header />
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
