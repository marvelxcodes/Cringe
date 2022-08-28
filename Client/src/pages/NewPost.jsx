import {} from 'react-file-base64'

const NewPost = () => {
  return (
    <div className='w-full h-[calc(100vh-5rem)] flex justify-center items-center'>
        <div className='h-96 w-80 shadow-2xl bg-red-100 rounded-2xl select-none relative space-y-4 flex items-center flex-col'>
            <h1 className='my-8 text-2xl font-bold text-red-300'>New Post</h1>
            <input type="text" className='outline-none rounded-full caret-red-500 text-center w-[calc(100%-1.5rem)] h-10' placeholder='Enter a Title' />
            <input type="text" className='outline-none text-center caret-red-500 rounded-full w-[calc(100%-1.5rem)] h-10' placeholder='Enter a Message' />
            <input type="file" className='text-red-300 w-[calc(100%-1.5rem)] pl-10 flex ' placeholder='Select a Image' />
            <button className='m-3 p-3 flex justify-center active:bg-red-800 hover:opacity-90 bottom-3 absolute transition-opacity rounded-full items-center bg-red-600 text-white w-[calc(100%-1.5rem)]'>Post</button>
        </div>
    </div>
  )
}

export default NewPost