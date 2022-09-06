import { createLike } from "../fetchers/liked"
import { useMutation } from "@tanstack/react-query"
import { useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import Protected from "../components/Protected"
import { useUser } from "@clerk/clerk-react"

const SignedUp = () => {
  const navigate = useNavigate()
  const { mutate } = useMutation(createLike, {
    onSuccess: () => {
      navigate('/')
    }
  })

  const { user } = useUser()

  useEffect(() => {
    if (user) {
      mutate({
        email: user.primaryEmailAddress.emailAddress
      })
    }
  }, [user])
  return (
    <Protected>Redirecting ...</Protected>
  )
}

export default SignedUp