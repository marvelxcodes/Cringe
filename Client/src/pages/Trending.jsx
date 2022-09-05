import { useUser } from '@clerk/clerk-react'
import { useEffect } from 'react'
import Post from '../components/Posts/Post'
import { getLiked } from '../fetchers/liked'
import { getTrending } from '../fetchers/posts'

const Trending = () => {

  const { user } = useUser()
  const email = user?.primaryEmailAddress?.emailAddress

  const { data: posts, refetch:fetchPosts } = getTrending()
  const { data: liked, refetch:fetchLiked } = getLiked(email)

  const fetchAll = () => {
    fetchLiked()
    fetchPosts()
  }
  useEffect(() => {
    if (user) {
      fetchAll()
    }
  }, [user])
  
  return (
    <div className="w-full flex container p-5 justify-center flex-wrap">
      {posts && posts.map((post) => (
        <Post
          key={post.id}
          liked={liked?.postId}
          email={email}
          refetch={fetchAll}
          {...post}
        />
      ))}
    </div>
  )
}
export default Trending