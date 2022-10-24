import React from 'react'
type CardBookingProps = {
    index: number
    buyer: string,
    provider: string,
    date: string,
    duration: number,
    removeBooking: (index: number) => void;
};

const CardBooking = ({ buyer, provider, date, duration, index, removeBooking }: CardBookingProps) => {
    return (
        <div className='my-3 rounded-xl w-2/4 h-auto shadow-xl flex flex-row px-14 py-4'>
            <div className='w-full'>
                <span className="mb-1 text-lg font-bold text-primary-darker flex flex-col w-full text-start">
                    Reserva {index}
                </span>
                <div className='grid grid-cols-3 w-full h-[80%]'>
                    <div className='h-52 w-auto flex py-3'>
                        <img className="max-w-xs rounded-lg" src="https://cdn.britannica.com/83/21083-050-C53FAB08/Richard-Feynman.jpg" alt="teacher_profile"/>
                    </div>
                    <div className='text-gray-800 flex flex-col justify-evenly'>
                        <p><span className='font-semibold text-secondary-darker w-full'>Buyer: </span> {buyer}</p>
                        <p><span className='font-semibold text-secondary-darker w-full'>Provider: </span> {provider}</p>
                    </div>
                    <div className='text-gray-800 flex flex-col justify-evenly'>
                        <p><span className='font-semibold text-secondary-darker w-full'>Date: </span> {date}</p>
                        <p><span className='font-semibold text-secondary-darker w-full'>Duration</span> {duration} minutes</p>
                    </div>
                </div>
            </div>

            <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-gray-500 dark:bg-gray-300 dark:hover:bg-gray-300" data-dismiss-target="#toast-notification" aria-label="Close" onClick={() => removeBooking(index)}>
                <span className="sr-only">Close</span>
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
        </div>
    )
}

export default CardBooking