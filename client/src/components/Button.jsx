import React from 'react'

function Button({classname = '', text, onClick = ()=>{}}) {
    const defultStyle = 'rounded-3xl h-fit px-4 py-2 text-lg'
    return (
        <button className={` ${defultStyle} ${classname}`}
                onClick={onClick}
        >{text}</button>
    )
}

export default Button
