import { handleSignOut } from "@/actions/auth"

export default async function SignIn() {
  return (
    <form action={handleSignOut}>
      <button type="submit">Sign out</button>
    </form>
  )
}
