import React from 'react'


const Modal = (props) => {


    function cancelHandler() {
        props.onCancel();
    }

    function confirmHandler() {
        props.onConfirm();
    }

    return (
        <div className='modal w-80 mx-auto mt-2'>
            <h2 className='text-green-500 text-md font-semibold text-center'
            >Are you sure you want to Refresh?<br />
                (Refreshing will clean up your result)
            </h2>
            <div className='mt-2'>
                <button className='text-green-700 text-md 
            px-5 py-1 border-2 border-green-500 font-semibold me-10'
                    onClick={confirmHandler}>Yes</button>
                <button className='bg-green-700 text-white text-md 
            px-5 py-1 font-semibold ms-10'
                    onClick={cancelHandler}>No</button>
            </div>

        </div>
    )
}

export default Modal