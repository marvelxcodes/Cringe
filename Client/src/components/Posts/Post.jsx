import { useQuery } from '@tanstack/react-query'
import moment from 'moment'
import { useEffect, useState } from 'react'
import Comments from './Comments'

const Post = (props) => {
  const [postId, setPostId] = useState("")
  const [isHearted, setIsHearted] = useState(false)
  useEffect(() => {
    
  }, [isHearted])
  return (
    <div key={props.id} className='w-80 m-5 outline select-none outline-2 outline-gray-200 hover:outline-gray-300 transition-all rounded-xl'>
      {postId && <Comments setId={setPostId} id={postId} />}
      <img src={props.selectedFile} className="rounded-t-xl aspect-video" alt="Post-Thumbnail" />
      <div className="p-5">
        <h3 className="text-gray-800 font-bold text-center">{props.message}</h3>
        <h6 className="text-gray-400 text-sm text-center mt-1">Posted By {props.creator} | {moment(props.createdAt).fromNow()}</h6>
        <div className="flex justify-center items-center mt-3 space-x-10">
          <i onClick={() => setIsHearted(true)} className={`bi cursor-pointer bi-heart-fill text-xl not-italic ${isHearted?"text-purple-500":""}`}>
            <span className="ml-1 text-lg">{props.likeCount}</span>
          </i>
          <i onClick={() => setPostId(props.id)} className="bi cursor-pointer bi-chat-heart-fill text-xl not-italic">
            <span className="ml-1 text-lg">{30}</span>
          </i>
        </div>
      </div>
    </div>
  )
}

export default Post