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
        <NavItem href='' {...Props}>house-heart-fill</NavItem>
        <NavItem href='Trending' {...Props}>fire</NavItem>
        <NavItem href='NewPost' {...Props}>plus-circle-fill</NavItem>
        <NavItem href='Profile' {...Props}>person-hearts</NavItem>
        <button className='flex w-32 items-center space-x-3 h-11 bg-white px-5 hover:outline transition-all outline-2 rounded-lg hover:bg-purple-400'>
          <i className="bi text-black hover:text-white bi-star-fill"></i>
          <p className='font-bold text-black hover:text-white transition-all'>{100}</p>
          <a href='https://github.com/marvelxcodes/' {...Props}>
            <i className="bi bi-github text-2xl text-center text-black font-semibold transition-all"/>
          </a>
        </button>
      </nav>
      <NavToggle {...Props} />
    </header>
  )
}

export default Header

const NavItem = ({ children, href, setIsOpen, isOpen }) => (
  <Link to={href}>
    <a className={`${isOpen ? "" : "md:flex hidden"} text-center hover:text-gray-200 text-purple-300 font-semibold transition-all`}
      onClick={() => setIsOpen(false)}>
      <i className={`bi bi-${children} text-2xl`}></i>
    </a>
  </Link>
)

const NavToggle = ({ isOpen, setIsOpen }) => (
  <svg onClick={() => setIsOpen(prevState => !prevState)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:hidden absolute right-8">
    <path className={`${isOpen ? "hidden" : ""}`} strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    <path className={`${isOpen ? "" : "hidden"}`} stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
  </svg>
)
