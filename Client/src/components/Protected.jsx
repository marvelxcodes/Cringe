import { SignedIn } from '@clerk/clerk-react'

const Protected = ({children}) => {
  return (
    <>
    <SignedIn>
        {children}
    </SignedIn>
    <SignedOut>
        <RedirectToSignIn />
    </SignedOut>
    </>
  )
}

export default Protected