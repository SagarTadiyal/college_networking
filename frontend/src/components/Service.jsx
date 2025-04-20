import React from 'react'

const Service = ({ data }) => {
    return (
        <div className='bg-gray-300 rounded-2xl p-4 '>
            <div className="flex items-center gap-4 font-serif text-lg ">
                <span>{data.icon}</span>
                <p>{data.desc}</p>

            </div>
        </div>
    )
}

export default Service