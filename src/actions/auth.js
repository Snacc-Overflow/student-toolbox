"use server"

import { signIn, signOut } from "@/auth"
import { isRedirectError } from "next/dist/client/components/redirect"

export async function handleSignIn() {
  try {
    await signIn()
  } catch (error) {
    if (isRedirectError(error)) {
      throw error
    }
    console.error(error)
  }
}

export async function handleSignOut() {
  try {
    await signOut()
  } catch (error) {
    if (isRedirectError(error)) {
      throw error
    }
    console.error(error)
  }
}
