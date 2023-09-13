import React from 'react'
import { useNavigate } from 'react-router-dom'

export const BackBtn = () => {
    const navigate = useNavigate()
  return (
    <button
    onClick={() => navigate(-1)}
    className='py-2 px-10 bg-green-50 text-green-700 rounded shadow-black hover:bg-green-300 my-4 mx-20'
    >
        Retour
    </button>
  )
}
