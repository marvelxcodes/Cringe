import { UserProfile } from "@clerk/clerk-react"
import Protected from "../components/Protected"

const Account = () => {
  return (
    <Protected>
      <div className="py-8 flex w-full justify-center">
        <UserProfile />
      </div>
    </Protected>
  )
}

export default Account