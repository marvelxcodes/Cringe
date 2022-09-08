import { useState } from "react"
import { useRef } from "react"
import TagsInput from "../components/Elements/TagsInput"
import { useUser } from "@clerk/clerk-react"
import Protected from "../components/Protected"
import { createPost } from '../fetchers/posts'
import { v4 as uuid } from 'uuid'
import axios from "axios"
import URL from "../utils/URL"
import Alert from '../components/Alerts/Alert'

const NewPost = () => {

  // Input Data
  const captionRef = useRef()
  const [thumbnail, setThumbnail] = useState("")
  const [tags, setTags] = useState([])

  const { user } = useUser()

  const createHandler = async () => {
    const imageName = `${uuid().toString()}.${thumbnail.name.substring(thumbnail.name.lastIndexOf('.') + 1)}`
    const form = new FormData()
    form.append('image', thumbnail, imageName)
    await axios.post(URL+"/posts/upload", form)
    await createPost({
      caption: captionRef?.current?.value,
      creator: user?.fullName,
      tags, thumbnail: imageName
    }).then(() => {
      setTags([])
      captionRef.current.value = ""
    })
  }

  return (
    <Protected>
      <div className='w-full h-[calc(100vh-5rem)] flex justify-center items-center'>
        <div className='h-96 w-80 shadow-sm bg-purple-100 rounded-2xl select-none relative space-y-4 flex items-center flex-col'>
            <h1 className='mt-8 text-2xl font-bold text-purple-300'>New Post</h1>
            <input ref={captionRef} type="text" className='px-5 outline-none rounded-full caret-purple-500 text-center w-[calc(100%-1.5rem)] h-10' placeholder='Enter a Caption' />
            <TagsInput setTags={setTags} tags={tags} />
            <input type="file" onChange={event => setThumbnail(event.currentTarget.files[0])} className="text-purple-300 w-[calc(100%-1.5rem)] pl-10 flex" />
            <button onClick={createHandler} className='m-3 p-3 flex justify-center active:bg-purple-800 hover:opacity-90 bottom-3 absolute transition-opacity rounded-full items-center bg-purple-600 text-white w-[calc(100%-1.5rem)]'>Post</button>
        </div>
      </div>
    </Protected>
  )
}

export default NewPost