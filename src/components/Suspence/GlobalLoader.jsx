import React from 'react'
import './global.css'

const GlobalLoader = () => {
  return (
    <>
        <div className='h-svh w-svh flex justify-center items-center'>
            <div className="typing-indicator">
                <div className="typing-circle"></div>
                <div className="typing-circle"></div>
                <div className="typing-circle"></div>
                <div className="typing-shadow"></div>
                <div className="typing-shadow"></div>
                <div className="typing-shadow"></div>
            </div>
        </div>
    </>
  )
}

export default GlobalLoader