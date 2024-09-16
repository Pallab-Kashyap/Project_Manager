import React, { useEffect, useRef, useState } from 'react'

function AddMember({ info,type }) {

    let {members, setMembers} = info

    const [inputValue, setInputValue] = useState('')

    const handleKeyDown = (e) => {
        if(e.key == 'Enter'){
            if(inputValue.trim() != ''){
                setMembers(prev => [inputValue, ...members] )
                setInputValue('')
            }
     }
    }

    const handleClick = (member) => {
        let updatedMembers = members.filter(currMember => currMember != member)
        setMembers(updatedMembers)
    }

    useEffect(()=>{
        setInputValue('')
    },[members])

    return (
        <div className=''>
            <ul className='flex gap-x-3 gap-2 flex-wrap-reverse border-2 border-gray-500 outline-gray-200 p-3 rounded-xl text-white max-h-72 overflow-scroll'>
            {/* <div className='flex justify-between'> */}
            <input type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`add ${type}`}
                className='bg-transparent outline-none w-full'
            />
                {/* <button className='border-2 border-gray-500 py-1 px-3 rounded-lg'>add</button>
            </div> */}
            {members && members.map((member) => (
                    <div className='flex gap-2 border-2 border-gray-200 p-1 px-2 rounded-xl justify-center items-center'>
                        <li key={member}
                            className='max-w-44 overflow-scroll'
                        >{member}</li>
                        <button
                            onClick={() => handleClick(member)}
                            className='border-2 border-red-400 text-red-400 rounded-full h-7 w-7  flex justify-center  '>x</button>
                    </div>
                ))}
             </ul>
        </div>
    )
}

export default AddMember
