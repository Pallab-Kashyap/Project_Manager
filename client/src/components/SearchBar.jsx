import React, { useState } from 'react'

function SearchBar({type, classname}) {

    const [text, setText] = useState('')

    return (
        <input type={type}
            value={text}
            onChange={(e)=>setText(e.currentTarget.value)}
            className={`${classname} `}
        />
    )
}

export default SearchBar
