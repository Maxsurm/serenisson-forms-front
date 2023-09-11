import { faEye, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


export const ListPatients = () => {

    const [patients, setPatients] = useState([])

    const API_URL = "http://localhost:8080/admin/patients/1/10"

    const fetchPatients = () => {
        axios.get(API_URL)
            .then((response) => setPatients(response.data))
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        fetchPatients()
    }, [])





    return (
        <>
            <h2 className='text-3xl font-bold mb-5'>Gestion des patients</h2>
            <Link to="#" className="bg-green-700 p-2 rounded-md text-white font-bold my-4" >Ajouter un patient</Link>
            <table className='w-full  mt-5 '>
                <thead >
                    <tr className="">
                        <th className="border-e border-gray-300 py-2 bg-green-700 text-white rounded-tl-xl" >Prénom</th>
                        <th className="border-e border-gray-300 py-2 bg-green-700 text-white " >Nom</th>
                        <th className="border-e border-gray-300 py-2 bg-green-700 text-white " >Mail</th>
                        <th className="border-gray-300 py-2 bg-green-700 text-white rounded-tr-xl" >Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        patients.map((patient, index) => (
                            <tr key={index} className="text-center">
                                <td className="border border-gray-300 py-2" >{patient.prenom}</td>
                                <td className="border border-gray-300 py-2" >{patient.nom}</td>
                                <td className="border border-gray-300 py-2" >{patient.mail}</td>
                                <td className="border border-gray-300 py-2" >
                                    <Link className='rounded-lg px-3 py-2 m-2 bg-blue-500 text-white'><FontAwesomeIcon icon={faEye} /></Link>
                                    <Link className='rounded-lg px-3 py-2 m-2 bg-green-700 text-white'><FontAwesomeIcon icon={faPenToSquare} /></Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>

    )
}
