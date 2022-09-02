import { createRoot } from 'react-dom/client'
import {
  BrowserRouter,
  Routes, Route
} from 'react-router-dom'
import {
  QueryClientProvider as QueryProvider
} from '@tanstack/react-query'
import QueryClient from './utils/QueryClient'
import ClerkProvider from './libs/Clerk'

// Stylesheets
import './libs/Tailwind.css'
import './utils/style.css'

import Header from './components/Header'
import Home from './pages/Home'
import NewPost from './pages/NewPost'
import Trending from './pages/Trending'
import Profile from './pages/Profile'

const App = () => {
  return (
    <BrowserRouter>
      <QueryProvider client={QueryClient}>
        <ClerkProvider>
          <main className="pt-16 w-full">
            <Header />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/NewPost' element={<NewPost />} />
              <Route path='/Trending' element={<Trending />} />
              <Route path='/Profile' element={<Profile />} />
            </Routes>
          </main>
        </ClerkProvider>
      </QueryProvider>
    </BrowserRouter>
  )
}

const Root = document.getElementById('root')
createRoot(Root).render(<App />)
