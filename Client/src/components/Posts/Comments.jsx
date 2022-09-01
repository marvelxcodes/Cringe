import moment from "moment"

const Comments = ({id, setId, Comments}) => {
  const exitHandler = event => {
    if (event.target === event.currentTarget) {
      setId("")
    }
  }
  return (
    <div onClick={exitHandler} className="h-screen z-30 w-screen fixed backdrop-blur-sm bg-[#00000050] top-0 left-0 flex items-center justify-center">
      <div className="h-3/4 max-w-xl py-5 bg-white space-y-5 w-5/6 shadow-2xl rounded-xl p-3">
        <div className="bg-purple-500 rounded-lg">
          <h1 className="w-full py-3 font-bold text-white text-lg text-center">Comments ( {10} )</h1>
        </div>
        <div className="overflow-scroll">
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        </div>
        <PostComment />
      </div>
    </div>
  )
}

const Comment = (props) => {
  return (
    <div className="w-full h-auto outline outline-1 rounded-lg outline-gray-300  px-[5%] py-3">
      <div className="flex flex-col h-2/3 pb-3">
      <p className="text-center text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, quaerat?</p>
      </div>
      <div className="flex relative h-1/3">
        <p className="font-semibold text-sm text-gray-400">By Rama Krishnan V</p>
        <p className="absolute right-0 text-sm text-gray-400">• 2 Minutes ago</p>
      </div>
    </div>
  )
}

const PostComment = () => {
  
  return (
    <div>
      <input type="text" />
    </div>
  )
}

export default Comments