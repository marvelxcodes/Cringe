import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
  Routes, Route
} from 'react-router-dom'
import {
  QueryClientProvider as QueryProvider
} from '@tanstack/react-query'
import QueryClient from './utils/QueryClient'

// Stylesheets
import './libs/Tailwind.css'
import './utils/style.css'

import Header from './components/Header'
import Home from './pages/Home'
import NewPost from './pages/NewPost'

const App = () => {
  return (
  <main className="pt-20 w-full">
    <QueryProvider client={QueryClient}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/NewPost' element={<NewPost />} />
        </Routes>
      </BrowserRouter>
    </QueryProvider>
  </main>
  )
}

const Root = document.getElementById('root')
ReactDOM.createRoot(Root).render(<App />)
