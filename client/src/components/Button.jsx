import React from 'react'

function Button({classname = '', text}) {
    return (
        <button className={`${classname} rounded-3xl h-fit px-4 py-2 text-lg`}>{text}</button>
    )
}

export default Button
