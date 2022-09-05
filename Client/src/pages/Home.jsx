import { useUser } from '@clerk/clerk-react'
import { useEffect } from 'react'
import Post from '../components/Posts/Post'
import { getLiked } from '../fetchers/liked'
import { getPosts } from '../fetchers/posts'

const Home = () => {

  const { user } = useUser()
  const email = user?.primaryEmailAddress?.emailAddress

  const { data: posts, refetch:fetchPosts } = getPosts()
  const { data: liked, refetch:fetchLiked } = getLiked(email)

  useEffect(() => {
    if (user) {
      fetchLiked()
      fetchPosts()
    }
  }, [user])
  
  return (
    <div className="w-full flex container p-5 justify-center flex-wrap">
      {posts && posts.map((post) => (
        <Post
          key={post.id}
          liked={liked?.postId}
          email={email}
          refetch={fetchLiked}
          {...post}
        />
      ))}
    </div>
  )
}
export default Home