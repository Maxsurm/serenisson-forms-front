import { faEye, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const QuestionLine = ({question}) => {

    const navigate = useNavigate()

    // const goToQuestion = () => {
    //     navigate(`/admin/questions/voir/${question.id}`)
    // }

    const editQuestion = () => {
        navigate(`/admin/questions/editer/${question.id}`)
    }

    return (
        <tr className="text-center">
            <td className="border border-gray-300 py-2" >{question.rankOrder}</td>
            <td className="border border-gray-300 py-2" >{question.question}</td>
            <td className="border border-gray-300 py-2" >{question.type}</td>
            <td className="border border-gray-300 py-2" >{question.formulaire}</td>
            <td className="border border-gray-300 py-2" >
                {/* <button onClick={goToQuestion}
                    className='rounded-lg px-3 py-2 mx-2 bg-blue-500 text-white'>
                    <FontAwesomeIcon icon={faEye} />
                </button> */}
                <button onClick={editQuestion} 
                    className='rounded-lg px-3 py-2 mx-2 bg-green-700 text-white'>
                    <FontAwesomeIcon icon={faPenToSquare} />
                </button>
            </td>
        </tr>
    )
}
