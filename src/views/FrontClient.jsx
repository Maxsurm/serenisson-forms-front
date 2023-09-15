import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'


export const FrontClient = () => {


    // "BOOL= Oui, Non"
    // "R1= Très satisfaisant , satisfaisant, peu satisfaisant, pas satisfait "
    // "R2= jamais, occasionnelles, assez fréquentes, toujours"
    const [n, setN] = useState(0)
    const [questions, setQuestions] = useState([{}])
    const [error, setError] = useState(null);

    const param = useParams()

    // recuperation des questions 
    const API_URL = `http://localhost:8080/admin/questions/form/${param.formulaire}`

    const fetchQuestions = async () => {
        try {
            const { data } = await axios.get(API_URL);
            console.log("data", data)
            setQuestions(data);  
            console.log("questions", questions)
        } catch (error) {
            setError(error.message);
        }

    };


    useEffect(() => {
        fetchQuestions();
        console.log("questions dans UE", questions);
    }, [n]);

    

    // recuperation des reponses


    const prevQuestion = () => {
        setN( n - 1 )
    }
    const nextQuestion = () => {
        setN( n + 1 )
    } 

    return (
        <>
            <header>
                <img id="big-logo" src="/public/img/Logo.png" alt="logo" />
            </header>
            <main className='flex justify-center my-20'>
                <div className="bg-[#DBFFD6] rounded-2xl sm:w-5/6 sm:mx-5 lg:w-1/2">
                    <div className="bg-[#50A34E] rounded-t-2xl text-white font-bold px-5 py-2">
                        <h1 className='text-center'>{questions[n].question}</h1>
                    </div>
                    {questions[n].type === "TEXT" && (
                        <div className="p-5 flex justify-center">
                            <input type="text" className='bg-white m-2 text-center font-semibold rounded-xl p-2 w-2/3 mx-auto' />
                        </div>
                    )}
                    
                    {questions[n].type === "BOOL" && (
                        <div className="p-5">
                            <div className="bg-white m-2 text-center font-semibold rounded-xl p-2 w-2/3 mx-auto">Oui</div>
                            <div className="bg-white m-2 text-center font-semibold rounded-xl p-2 w-2/3 mx-auto">Non</div>
                        </div>
                    )}
                    {questions[n].type === "R1" && (
                        <div className="p-5">
                            <div className="bg-white m-2 text-center font-semibold rounded-xl p-2 w-2/3 mx-auto">Très satisfaisant</div>
                            <div className="bg-white m-2 text-center font-semibold rounded-xl p-2 w-2/3 mx-auto">Satisfaisant</div>
                            <div className="bg-white m-2 text-center font-semibold rounded-xl p-2 w-2/3 mx-auto">Peu satisfaisant</div>
                            <div className="bg-white m-2 text-center font-semibold rounded-xl p-2 w-2/3 mx-auto">Pas satisfait</div>
                        </div>
                    )}
                    {questions[n].type === "R2" && (
                        <div className="p-5">
                            <div className="bg-white m-2 text-center font-semibold rounded-xl p-2 w-2/3 mx-auto">Jamais</div>
                            <div className="bg-white m-2 text-center font-semibold rounded-xl p-2 w-2/3 mx-auto">Occasionnelles</div>
                            <div className="bg-white m-2 text-center font-semibold rounded-xl p-2 w-2/3 mx-auto">Assez fréquentes</div>
                            <div className="bg-white m-2 text-center font-semibold rounded-xl p-2 w-2/3 mx-auto">Toujours</div>
                        </div>
                    )}
                    {questions[n].type === "NUMBER" && (
                        <div className="p-5 flex justify-center">
                            <input type="number" className='bg-white m-2 text-center font-semibold rounded-xl p-2 w-2/3 mx-auto' />
                        </div>
                    )}
                    {questions[n].type === "TEXTAREA" && (
                        <div className="p-5 flex justify-center">
                            <textarea type="text" className='bg-white m-2 text-center font-semibold rounded-xl p-2 w-2/3 mx-auto' />
                        </div>
                    )}
                    <div className='flex justify-around pb-8'>
                        {questions[n].rankOrder > 1 && <button onClick={prevQuestion} className='bg-[#317845] w-1/3 text-white font-bold rounded-xl p-2'>Précédent</button>}
                        <button onClick={nextQuestion} className='bg-[#317845] w-1/3 text-white font-bold rounded-xl p-2'>Suivant</button>
                    </div>
                </div>
            </main>
        </>
    )
}