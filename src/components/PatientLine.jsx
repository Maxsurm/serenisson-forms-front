import { faEye, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const PatientLine = ({patient}) => {

    const navigate = useNavigate()

    const goToPatient = () => {
        navigate(`/admin/patients/voir/${patient.id}`)
    }

    const editPatient = () => {
        navigate(`/admin/patients/editer/${patient.id}`)
    }

    return (
        <tr className="text-center">
            <td className="border border-gray-300 py-2" >{patient.prenom}</td>
            <td className="border border-gray-300 py-2" >{patient.nom}</td>
            <td className="border border-gray-300 py-2" >{patient.mail}</td>
            <td className="border border-gray-300 py-2" >
                <button onClick={goToPatient}
                    className='rounded-lg px-3 py-2 mx-2 bg-blue-500 text-white'>
                    <FontAwesomeIcon icon={faEye} />
                </button>
                <button onClick={editPatient} 
                    className='rounded-lg px-3 py-2 mx-2 bg-green-700 text-white'>
                    <FontAwesomeIcon icon={faPenToSquare} />
                </button>
            </td>
        </tr>
    )
}
