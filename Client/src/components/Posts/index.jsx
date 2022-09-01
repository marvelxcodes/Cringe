import Post from "./Post"
import { getPosts } from "../../controllers/posts"
import { useQuery } from '@tanstack/react-query'
import Comments from "./Comments"
import { useState } from "react"

const Posts = () => {
  const { data, isLoading, isError } = useQuery(["posts"], getPosts)
  return (
    <div className="flex container p-5 justify-center flex-wrap">
      {isLoading && "Loading..."}
      {isError && "Error Occured!"}
      {data?.data?.map((post) => (
        <Post {...post} />
      ))}
    </div>
  )
}

export default Posts