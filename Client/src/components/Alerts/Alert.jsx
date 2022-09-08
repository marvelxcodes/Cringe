import { useState, useEffect } from 'react'

const Alert = ({children}) => {
    const [state, setState] = useState(true)
    useEffect(() => {
        if (state) {
            setTimeout(() => setState(false), 5000)
        }
    }, [])

    return ( 
    <div className={`z-30 rounded-md h-16 w-[calc(100vw-2rem)] max-w-sm absolute ${state?"":"hidden"}
                    bg-[#fff] outline outline-1 outline-purple-500 shadow-2xl right-5 bottom-5`}>
        <div className='h-1 rounded-t-2xl bg-purple-500'></div>
        <div className='flex flex-1 items-center justify-center'>
            {children}
        </div>
    </div>
    )
}

export default Alert