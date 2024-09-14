import React from 'react'

function Button({classname = '', text, onClick = ()=>{}}) {
    const defultStyle = 'rounded-3xl h-fit text-lg'
    return (
        <button className={` ${defultStyle} ${classname}`}
                onClick={onClick}
        >{text}</button>
    )
}

export default Button
