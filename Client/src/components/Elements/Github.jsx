const Github = ({ setIsOpen, isOpen }) => (
    <a href='https://github.com/marvelxcodes' className={`${isOpen ? "" : "md:flex hidden"} flex-col text-center hover:text-gray-200
            text-purple-300 font-semibold transition-all`}
        onClick={() => setIsOpen(false)}>
        <i className={`bi bi-github text-2xl`}></i>
        <p className='text-xs text-center hidden md:flex'>Github</p>
    </a>
)

export default Github;