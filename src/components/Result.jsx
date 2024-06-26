import React from 'react'

const Result = ({ correctAnswer, wrongAnswer, percentage }) => {

    const percent = Math.floor(correctAnswer / (correctAnswer + wrongAnswer) * 100);
    return (
        <div className='second-modal sm:w-auto md:w-1/3 mx-auto mb-2'>

            <div className='mt-5'>
                <h1 className='text-green-500 text-md font-bold text-start'
                >Correct Answers : {correctAnswer}</h1>
                <h1 className='text-green-500 text-md font-bold text-start'
                >Incorrect Answers : {wrongAnswer} </h1>
                {percent >= 50 && <h1 className='text-white-500 text-md font-bold
                 text-start'>
                    <span className='text-green-500 text-md font-bold text-start'>Performance : </span>
                    <p className='p-1 text-white bg-green-600 rounded-md '>
                        {percentage || `Not available`}</p> </h1>}

                {percent < 50 && <h1 className='text-white-500 text-md font-bold text-start'
                >
                    <span className='text-green-500 text-md font-bold text-start'>Performance : </span>
                    <p className='p-1 text-white bg-red-600 rounded-md
                '>{percentage || `Not available`}</p> </h1>}
            </div>
        </div>
    )
}

export default Result