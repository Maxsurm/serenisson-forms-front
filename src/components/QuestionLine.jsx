import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const QuestionLine = ({ question , fetchQuestions}) => {

    const navigate = useNavigate()

    const editQuestion = () => {
        navigate(`/admin/questions/editer/${question.id}`)
    }

    const [type, setType] = useState("")

    const changeType = () => {
        switch (question.type) {
            case ("TEXT"):
                setType("Texte")
                break;
            case ("BOOL"):
                setType("Oui/Non")
                break;
            case ("TEXTAREA"):
                setType("Texte(Long)")
                break;
            case ("R1"):
                setType("QCM Satisfaction")
                break;
            case ("R2"):
                setType("QCM Temporel")
                break;
            case ("NUMBER"):
                setType("Nombres")
                break;
            default:
                break;
        }
    }
    const [form, setForm] = useState("")

    const changeForm = () => {
        switch (question.formulaire) {
            case ("ANAMNESE"):
                setForm("Anamnèse")
                break;
            case ("SIXMOIS"):
                setForm("Questionnaire 6 mois")
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        changeType()
        changeForm()
    }, [])

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    };

    //suppression
    const deleteQuestion = () => {
        axios.delete(`http://localhost:8080/admin/questions/${question.id}`)
            .then(r => {fetchQuestions()})
            .catch(e => console.log(e))
    }


    return (
        <tr className="text-center">
            <td className="border border-gray-300 py-2" >{question.rankOrder}</td>
            <td className="border border-gray-300 py-2" >{truncate(question.question, 120)}</td>
            <td className="border border-gray-300 py-2" >{type}</td>
            <td className="border border-gray-300 py-2" >{form}</td>
            <td className="border border-gray-300 py-2" >
                <button onClick={editQuestion}
                    className='rounded-lg px-3 py-2 mx-2 bg-green-700 text-white'>
                    <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <button onClick={deleteQuestion}
                    className='rounded-lg px-3 py-2 mx-2 bg-red-700 text-white'>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </td>
        </tr>
    )
}
