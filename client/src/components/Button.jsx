import React from 'react'

function Button({classname = '', text, onClick = ()=>{}}) {
    const defultStyle = 'rounded-md text-sm'
    return (
        <button className={` ${defultStyle} ${classname}  align-middle`}
                onClick={onClick}
        >{text}</button>
    )
}
// function Button({classname = '', text, onClick = ()=>{}}) {
//     return (
//         <button className={`${classname}`}
//                 onClick={onClick}
//         ><p>{text}</p>
//         </button>
//     )
// }

export default Button
