import moment from 'moment'
import { createLike } from '../../fetchers/liked'
import { useEffect, useState } from 'react'
import Comments from './Comments'
import { useUser } from '@clerk/clerk-react'
import { useMutation } from '@tanstack/react-query'

const Post = (props) => {

  // Shows Comment Box if has {blogId}
  const [postId, setPostId] = useState("")
  const { user, isSignedIn } = useUser()
  const [isLiked, setIsLiked] = useState(props.liked===undefined || !props.liked.includes(props.id)?false:true)
  const { mutate } = useMutation(createLike)

  const handleLike = () => setIsLiked(true)
  
  useEffect(() => {
    if (isSignedIn && !isLiked) {
      mutate({
        email: user?.primaryEmailAddress?.emailAddress,
        postId: [...props.liked || [], props.id],
        likes: props.likes,
        liked: props.liked
      })
    }
  }, [isLiked])

  return (
    <div className='w-80 m-5 outline select-none outline-2 bg-white outline-gray-200 hover:outline-gray-300 transition-all rounded-xl'>
      {postId && <Comments setId={setPostId} id={postId} />}
      <img src={props.thumbnail} className="rounded-t-xl aspect-video" alt="Post-Thumbnail" />
      <div className="p-5">
        <h3 className="text-gray-800 font-bold text-center">{props.caption}</h3>
        <h6 className="text-gray-400 text-sm text-center mt-1">Posted By {props.creator}</h6>
        <h6 className="text-gray-400 text-sm text-center mt-1">• {moment(props.createdAt).fromNow()}</h6>
        <div className="flex justify-center items-center mt-3 space-x-10">
          <i onClick={handleLike} className={`bi cursor-pointer bi-heart-fill text-xl not-italic ${isLiked?"text-purple-500":"text-gray-400"}`}>
            <span className="ml-1 text-lg">{props.likes}</span>
          </i>
          <i onClick={() => setPostId(props.id)}
             className="bi text-gray-400 cursor-pointer bi-chat-heart-fill text-xl not-italic">
          </i>
        </div>
      </div>
    </div>
  )
}

export default Post