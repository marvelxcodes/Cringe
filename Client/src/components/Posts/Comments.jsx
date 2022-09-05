import { useUser } from "@clerk/clerk-react"
import { useMutation } from "@tanstack/react-query"
import moment from "moment"
import { useRef } from "react"
import { getComments, createComment } from "../../fetchers/comments"
import Protected from "../Protected"

const Comments = ({ id, setId }) => {
  const exitHandler = event => {
    if (event.target === event.currentTarget) {
      setId("")
    }
  }

  const { data, isLoading, refetch } = getComments(id)
  return (
    <Protected>
      <div onClick={exitHandler} className="h-screen z-30 w-screen fixed backdrop-blur-sm bg-[#00000050] top-0 left-0 flex items-center justify-center">
        <div className="h-3/4 max-w-xl py-5 bg-white space-y-5 w-5/6 shadow-2xl rounded-xl p-4">
          <div className="bg-purple-500 rounded-lg">
            <h1 className="w-full py-3 font-bold text-white text-lg text-center">
              <i className="bi bi-chat-heart-fill mr-2"></i>Comments ( {data?.data.length} )</h1>
          </div>
          <div className="overflow-y-scroll h-2/3 space-y-2 p-3">
            {data && data?.data.map(comment => (
              <Comment key={comment.id} {...comment} />
            ))}
            {isLoading && "Loading..."}
          </div>
          <PostComment
            postId={id}
            refetch={refetch}
          />
        </div>
      </div>
    </Protected>
  )
}

const Comment = (props) => {
  return (
    <div className="w-full h-auto outline outline-1 rounded-lg outline-gray-300  px-[5%] py-3">
      <div className="flex flex-col h-2/3 pb-3">
        <p className="text-center text-sm text-gray-700 font-bold">{props.body}</p>
      </div>
      <div className="flex relative h-1/3">
        <p className="font-semibold text-xs text-gray-400">By {props.author}</p>
        <p className="absolute right-0 text-xs text-gray-400">• {moment(props.createdAt.toString()).fromNow()}</p>
      </div>
    </div>
  )
}

const PostComment = ({postId, refetch}) => {
  const { user } = useUser() 
  const commentRef = useRef()
  const { mutate } = useMutation(createComment, {
    onSuccess: () => {
      refetch()
    }
  })

  const createHandler = async () => {
    const body = commentRef?.current?.value
    if (body && user) {
      mutate({
        author: user.fullName,
        body, postId
      })
      commentRef.current.value = ""
    }
  }
  return (
    <form onClick={event => { event.preventDefault(); createHandler()}} className="flex py-3 items-center justify-center">
      <input ref={commentRef} type="text" className="w-5/6 px-5 caret-purple-600 focus:outline-purple-500 h-10 outline outline-1 rounded-sm outline-gray-300 text-sm" placeholder="Write Something . . ." />
      <button onClick={createHandler} className="h-10 flex items-center justify-center hover:bg-purple-700 transition-colors active:opacity-80 aspect-square bg-purple-500 outline outline-1 rounded-sm outline-purple-500 ml-1.5 text-white">
        <i className="bi bi-send-fill"></i>
      </button>
    </form>
  )
}

export default Comments