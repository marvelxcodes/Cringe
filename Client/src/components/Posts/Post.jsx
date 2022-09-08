import moment from 'moment'
import { appendLike } from '../../fetchers/liked'
import { useState } from 'react'
import Comments from './Comments'
import { useUser } from '@clerk/clerk-react'
import { useMutation } from '@tanstack/react-query'
import URL from '../../utils/URL'
import { useEffect } from 'react'

const Post = (props) => {
  // Shows Comment Box if has {blogId}
  const [postId, setPostId] = useState("")
  const { user, isSignedIn } = useUser()

  const isLiked = props.liked?.includes(props.id)
  
  const [ currLikeState, setCurrLikeState ] = useState(false)
  const { mutate } = useMutation(appendLike, {
    onSuccess: () => {
      props.refetch()
    }
  })
  const [isInit, setIsInit] = useState(true)
  useEffect(() => {
    setIsInit(false)
    if (isInit) {
      setCurrLikeState(isLiked)
    } else {
      handleLike()
    }
  }, [currLikeState])

  const handleLike = () => {
    if (isSignedIn && !isLiked) {
      mutate({
        currPostId:props.id,
        email: user.primaryEmailAddress.emailAddress,
        postId: [...props.liked, props.id],
        likes: props.likes,
      })
    }
  }

  return (
    <div className='w-80 m-5 outline select-none outline-2 bg-white outline-gray-200 hover:outline-gray-300 transition-all rounded-xl'>
      {postId && <Comments setId={setPostId} id={postId} />}
      <img src={`${URL}/${props.thumbnail}`} className="rounded-t-xl aspect-video" alt="Post-Thumbnail" />
      <div className="p-5">
        <h3 className="text-gray-800 font-bold text-center">{props.caption}</h3>
        <h6 className="text-gray-400 text-sm text-center mt-1">Posted By {props.creator}</h6>
        <h6 className="text-gray-400 text-sm text-center mt-1">• {moment(props.createdAt).fromNow()}</h6>
        <div className="flex justify-center items-center mt-3 space-x-10">
          <i onClick={() => setCurrLikeState(true)} className={`bi cursor-pointer bi-heart-fill text-xl not-italic ${currLikeState?"text-purple-500":"text-gray-400"}`}>
            <span className="ml-1 text-lg font-bold">{props.likes}</span>
          </i>
          <i onClick={() => setPostId(props.id)}
             className="bi text-gray-400 cursor-pointer bi-chat-heart-fill text-xl not-italic">
             <span className="ml-1 text-lg font-bold">{props._count.Comment}</span>
          </i>
        </div>
      </div>
    </div>
  )
}

export default Post