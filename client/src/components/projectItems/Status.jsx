import React from 'react'
import STATUS from '../../utils/enum'
import '../../App.css'

function Status({info}) {

    const status = info.status
    // const status = 'In Progress'
    let bg = ''
    let color = ''
    let border = ''
    let dot = ''

    if(status === STATUS.NOT_STARTED){
        bg = 'bg-purple-900',
        color = 'text-purple-300'
        border = 'border-2 border-purple-500'
        dot = 'bg-purple-500'
    }
    else if(status === STATUS.IN_PROGRESS){
        bg = 'bg-blue-900',
        color = 'text-blue-300'
        border = 'border-2 border-blue-500'
        dot = 'bg-blue-500'
    }
    else if(status === STATUS.COMPLETED){
        bg = 'bg-green-900',
        color = 'text-green-300'
        border = 'border-2 border-green-500'
        dot = 'bg-green-500'
    }
    else if(status === STATUS.ON_HOLD){
        bg = 'bg-orange-900',
        color = 'text-orange-300'
        border = 'border-2 border-orange-500'
        dot = 'bg-orange-500'
    }
    else if(status === STATUS.CANCELLED){
        bg = 'bg-red-900',
        color = 'text-red-300'
        border = 'border-2 border-red-500'
        dot = 'bg-red-500'
    }

    return (
        <div className='text-white relative  sm:p-6 sm:px-16 flex justify-center whitespace-nowrap text-sm'>
            <div className={`${bg} ${color} ${border} text-center opacity text-md rounded-2xl  p-1 px-3 flex justify-center items-center w-fit gap-2 absolute sm:relative top-[-32px] right-1 sm:top-auto sm:bottom-auto`}

            >
                <div className={`dot ${dot} h-[8px] w-[8px]`}></div>
                <div >{status}</div>
            </div>
        </div>
    )
}

export default Status
