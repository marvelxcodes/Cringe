import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import Post from '../components/Posts/Post'
import { getPosts } from '../fetchers/posts'

const Home = () => {
  const { data, isLoading, isError } = useQuery(["posts"], getPosts)
  const {  } = useQuery(["liked"], getPosts)
  return (
    <div className="w-full flex container p-5 justify-center flex-wrap">
      {isLoading && "Loading..."}
      {isError && "Error Occured!"}
      {data?.data?.map((post) => (
        <Post {...post} />
      ))}
    </div>
  )
}
export default Home