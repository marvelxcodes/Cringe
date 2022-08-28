import { useInfiniteQuery } from '@tanstack/react-query'
import Posts from '../components/Posts'

const Home = () => {
  return (
    <div className='w-full flex justify-center'>
      <Posts />
    </div>
  )
}

export default Home