import { useRef } from 'react'
import { useState } from 'react'

const TagsInput = ({tags, setTags}) => {
    const inputRef = useRef()

    const appendTag = event => {
        event.preventDefault()
        if(inputRef.current.value.length!=0) {
            setTags([...tags, inputRef.current.value])
            inputRef.current.value = ""
        }
    }

    const removeTag = name => {
        
        const filteredArray = tags.filter(tag => {
            if (tag != name) {
                return tag
            }
        })
        setTags(filteredArray)
    }

    return (
    <>
    <form onSubmit={appendTag} className="flex justify-center pl-10 w-[calc(100%-1.5rem)] bg-white rounded-full">
        <input ref={inputRef} type="text" className='rounded-full outline-none text-center caret-purple-500 w-full h-10' placeholder='Add some tags...' />
        <button onClick={appendTag} className="m-1 bg-purple-600 h-8 rounded-full aspect-square">
            <i className="bi bi-plus text-white text-2xl flex items-center justify-center"></i>
        </button>
    </form>
    <div className='h-20 space-y-3 overflow-y-scroll'>
        {tags && tags.map(tag => (
            <Tag removeTag={removeTag} name={tag} />
        ))}
    </div>
    </>
    )
}

const Tag = (props) => {
    return (
        <div key={props.name+'#key'}
                className='overflow-clip relative w-56 bg-gray-300 h-7 rounded-full flex items-center justify-center px-3'>
            <p className='overflow-clip h-7 text-center pt-1 text-gray-500 w-5/6 text-sm'>
                {props.name}
            </p>
            <i onClick={() => props.removeTag(props.name)}
            className="bi bi-x text-purple-500 absolute right-1.5 rounded-full
                        p-0.5 flex items-center active:opacity-70 hover:text-white hover:bg-gray-600"></i>
        </div>
    )
}

export default TagsInput