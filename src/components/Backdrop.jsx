import React from 'react'

const Backdrop = (props) => {
    return (
        <div className='bg-gray-600 '
            onClick={props.onCancel}></div>
    )
}

export default Backdrop