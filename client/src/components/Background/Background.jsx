import React from 'react'

function Background({children}) {
    return (
        <div className='h-screen w-screen bg-slate-900'>
            {children}
        </div>
    )
}

export default Background
