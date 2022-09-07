import { useUser } from '@clerk/clerk-react'
import { useEffect } from 'react'
import Post from '../components/Posts/Post'
import Protected from '../components/Protected'
import { getLiked } from '../fetchers/liked'
import { getPosts } from '../fetchers/posts'

const Home = () => {

  const { user } = useUser()
  const email = user?.primaryEmailAddress?.emailAddress

  const { data: posts, refetch:fetchPosts } = getPosts()
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
    <Protected>
      <div className="w-full flex p-5 justify-center flex-wrap">
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
    </Protected>
  )
}
export default Home