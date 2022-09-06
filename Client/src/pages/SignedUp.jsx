import { createLike } from "../fetchers/liked"
import { useMutation } from "@tanstack/react-query"
import { useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import Protected from "../components/Protected"

const SignedUp = () => {
  const navigate = useNavigate()
  const { mutate } = useMutation(createLike, {
    onSuccess: () => {
      navigate('/')
    }
  })

  useEffect(() => {
    mutate()
  }, [])
  return (
    <Protected>Redirecting ...</Protected>
  )
}

export default SignedUp