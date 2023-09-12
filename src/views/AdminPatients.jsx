import React from 'react'
import { ListPatients } from '../components/ListPatients'
import { Link } from 'react-router-dom'

export const AdminPatients = () => {
    
    return (
        <>
        <h2 className='text-3xl font-bold mb-5'>Gestion des patients</h2>
            <Link to="/admin/patients/ajouter" className="bg-green-700 p-2 rounded-md text-white font-bold my-4" >Ajouter un patient</Link>
        <ListPatients />
        </>
    )
}
