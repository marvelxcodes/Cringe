import { useUser, useClerk } from "@clerk/clerk-react";
import Protected from "../components/Protected";

const Profile = () => {
  const { user } = useUser()
  const { signOut } = useClerk()
  return (
    <Protected>
      <div className="flex md:flex-row flex-col h-[calc(100vh-4rem)] w-screen">
        <div className="flex-1 flex items-center justify-center">
          <img src={user && user.profileImageUrl}
            className='aspect-square max-w-[18rem] w-8/12 rounded-full shadow-2xl shadow-purple-600 outline outline-2 outline-gray-300'
            alt="" />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center pb-20 pr-0 md:pb-0 md:pr-20">
          <h1 className="text-3xl font-extrabold text-gray-400">{user && user.fullName}</h1>
          <h3 className="font-extrabold text-gray-300">{user && user.primaryEmailAddress.emailAddress}</h3>
          <div className="flex">
            <Button onClick={signOut}>My Posts</Button>
            <Button onClick={signOut}>Sign Out</Button>
          </div>
        </div>
      </div>
    </Protected>
  )
}

export default Profile

const Button = ({ children, onClick }) => {
  return <button onClick={onClick} className="px-5 py-3 text-white mx-3 text-sm mt-5 font-bold
         hover:bg-purple-700 active:opacity-80 transition-colors
          rounded bg-purple-500 ">{children}</button>
}