import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'

const Protected = ({children}) => {
  return (
    <>
    <SignedIn>
        {children}
    </SignedIn>
    <SignedOut>
        <RedirectToSignIn afterSignUpUrl={"/SignedUp"} />
    </SignedOut>
    </>
  )
}

export default Protected