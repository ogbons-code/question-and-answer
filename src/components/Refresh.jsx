
import React from 'react'
import { useState } from "react"
import Backdrop from './Backdrop'
import Modal from './Modal'


const Refresh = () => {

    const [openModal, setOpenModal] = useState(false)



    const handleClick = () => {
        setOpenModal(true)
    }

    function closeModalHandler() {
        setOpenModal(false)
    }

    function resetPage() {
        window.location.assign("../App.jsx")
    }

    return (

        <>
            <button className='bg-green-700 text-white text-md 
            px-3 py-1 rounded-md font-semibold my-4'
                onClick={handleClick}>Refresh?</button>
            {openModal && <Modal onCancel={closeModalHandler} onConfirm={resetPage} />}
            {openModal && <Backdrop onCancel={closeModalHandler} />}
        </>




    )
}

export default Refresh