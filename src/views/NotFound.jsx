import React from 'react'
import { Link } from 'react-router-dom'

export const NotFound = () => {
    return (
        <main>
            <h1 className='text-8xl font-bold text-center py-12'>404
            <span className='text-green-700'>!</span>
            </h1>
            <p className='text-center text-xl mb-3'>Nous n'arrivons pas à trouver votre page...</p>
            <div className=" flex justify-center">
            <Link className=' mt-3 text-white font-bold bg-green-500 rounded p-2' to={'/'}>
                Retour à l'accueil
            </Link>
            </div>
        </main>
    )
}
