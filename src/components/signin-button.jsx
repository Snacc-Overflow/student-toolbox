import { handleSignIn } from "@/actions/auth"

export default async function SignIn() {
  return (
    <form action={handleSignIn}>
      <button type="submit">Sign in</button>
    </form>
  )
}
