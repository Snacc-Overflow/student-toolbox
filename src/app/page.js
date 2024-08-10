import { auth } from "@/auth"
import SignInButton from "@/components/signin-button"
import SignOutButton from "@/components/signout-button"
import Title from "@/components/title"
import Link from "next/link"

export default async function Home() {
  const session = await auth()
  console.log(session ? "Signed in" : "Not signed in")

  return (
    <main>
      {session ? <SignOutButton /> : <SignInButton />}
      <Title text={`👋 Welcome, ${session ? session.user.name : "student"}!`} />
      <ul>
        <li>
          <Link href="/calculator">Grade calculator</Link>
        </li>
        <li>
          <Link href="/timetable">Timetable</Link>
        </li>
        <li>
          <Link href="/todo">To-do list</Link>
        </li>
      </ul>
    </main>
  )
}
