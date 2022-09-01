import { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const Props = { setIsOpen, isOpen }
  return (
    <header
      className='fixed z-30 top-0 h-16 w-full items-center
                   flex px-8 from-purple-500 to-purple-600
                   bg-gradient-to-t shadow-2xl text-white'>
      <h1 className={`text-2xl md:w-auto transition-all ${isOpen?"scale-x-0":""} font-bold`}>Cringe</h1>
      <nav className={`flex w-full justify-center pl-14 md:w-auto absolute right-10 space-x-8 items-center`}>
        <NavItem href='' {...Props} i="house-heart-fill">Home</NavItem>
        <NavItem href='Trending' {...Props} i="fire">Trending</NavItem>
        <NavItem href='NewPost' {...Props} i="plus-circle-fill">New Post</NavItem>
        <NavItem href='Profile' {...Props} i="person-hearts">Profile</NavItem>
        <Github {...Props} />
      </nav>
      <NavToggle {...Props} />
    </header>
  )
}

export default Header

const NavItem = ({ children, i, href, setIsOpen, isOpen }) => (
  <Link to={href}>
    <a className={`${isOpen ? "" : "md:flex hidden"} flex-col text-center hover:text-gray-200 text-purple-300 font-semibold transition-all`}
      onClick={() => setIsOpen(false)}>
      <i className={`bi bi-${i} text-2xl`}></i>
      <p className='text-xs text-center hidden md:flex'>{children}</p>
    </a>
  </Link>
)

const NavToggle = ({ isOpen, setIsOpen }) => (
  <svg onClick={() => setIsOpen(prevState => !prevState)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:hidden absolute right-8">
    <path className={`${isOpen ? "hidden" : ""}`} strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    <path className={`${isOpen ? "" : "hidden"}`} stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
  </svg>
)

const Github = ({ setIsOpen, isOpen }) => (
  <a href='https://github.com/marvelxcodes' className={`${isOpen ? "" : "md:flex hidden"} flex-col text-center hover:text-gray-200
        text-purple-300 font-semibold transition-all`}
     onClick={() => setIsOpen(false)}>
    <i className={`bi bi-github text-2xl`}></i>
    <p className='text-xs text-center hidden md:flex'>Github</p>
  </a>
)