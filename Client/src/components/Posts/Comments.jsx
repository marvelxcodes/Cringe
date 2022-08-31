const Comments = ({id, setId}) => {
  const exitHandler = event => {
    if (event.target === event.currentTarget) {
      setId("")
    }
  }
  return (
    <div onClick={exitHandler} className="h-screen z-30 w-screen fixed backdrop-blur-sm bg-[#00000050] top-0 left-0 flex items-center justify-center">
      <div className="h-3/4 max-w-xl bg-white w-5/6 shadow-2xl rounded-xl">
        
      </div>
    </div>
  )
}

export default Comments