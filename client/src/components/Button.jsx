import React from 'react'

function Button({classname = '', text}) {
    return (
        <button className={` rounded-3xl h-fit px-4 py-2 text-lg ${classname}`}>{text}</button>
    )
}

export default Button
