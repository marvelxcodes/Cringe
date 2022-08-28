import Logo from '../assets/logo.png'

const Header = () => {
  return (
    <header className='fixed top-0 h-16 w-[calc(100%-1.5rem)] rounded-lg bg-gray-200 items-center flex px-5 shadow-lg m-3'>
        <img src={Logo} alt="Logo" className='aspect-square h-10' />
        <h1 className='text-2xl mx-1 text-red-500 font-bold'>Cringe</h1>
    </header>
  )
}

export default Header