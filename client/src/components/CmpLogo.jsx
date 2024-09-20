import React from 'react'
import '../pages/home/Home.css'

function CmpLogo({isHovered}) {
    return (
        <div className={`text-3xl font-bold CMPlogo text-center`}>
            {`${isHovered ? 'Name' : 'M'}`}
        </div>
    )
}

export default CmpLogo
