import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useSearchParams } from 'react-router-dom'


export const FrontClient = () => {


    // "BOOL= Oui, Non"
    // "R1= Très satisfaisant , satisfaisant, peu satisfaisant, pas satisfait "
    // "R2= jamais, occasionnelles, assez fréquentes, toujours"
    const [n, setN] = useState(0)
    const [questions, setQuestions] = useState([{}])
    const [error, setError] = useState(null);
    const [responses, setResponses] = useState([])
    const [response, setResponse] = useState("")
    const [queryParameters] = useSearchParams()



    const param = useParams()

    // recuperation des questions 
    const API_URL = `http://localhost:8080/admin/questions/form/${param.formulaire.toUpperCase()}`

    const fetchQuestions = async () => {
        try {
            const { data } = await axios.get(API_URL);
      
            setQuestions(data);  
            
        } catch (error) {
            setError(error.message);
        }

    };




    useEffect(() => {
        fetchQuestions();
       
    }, [n]);

    

    // recuperation des reponses

    const updateResponses = (key,value) => {

        setResponses([...responses,{questions:key, response:value}])
        console.log(responses)
  
    }

    const prevQuestion = () => {
        setN( n - 1 )
        setResponse(responses.get(questions[n]))
    }
    const nextQuestion = () => {
       updateResponses(questions[n],response)
       setResponse("")
        setN( n + 1 )
    } 

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(responses)
        axios.post(`http://localhost:8080/form/${param.formulaire.toUpperCase()}/${queryParameters.get("token")}`, responses)
        .then((res) => console.log("Succes"))
        .catch((error) => console.log("Erreurs"))

        


    }

    return (
        <>
            <header>
                <img id="big-logo" src="/public/img/Logo.png" alt="logo" />
            </header>
            <main className='flex justify-center my-20'>
                <div className="bg-[#DBFFD6] rounded-2xl sm:w-5/6 sm:mx-5 lg:w-1/2 shadow-lg shadow-slate-500">
                    <div className="bg-[#50A34E] rounded-t-2xl text-white font-bold px-5 py-2">
                        <h1 className='text-center'>{questions[n].question}</h1>
                    </div>
                    {questions[n].type === "TEXT" && (
                        <div className="p-5 flex justify-center">
                            <input type="text" className='bg-white m-2 text-center font-semibold rounded-xl p-2 w-2/3 mx-auto' onChange={(e) => setResponse(e.target.value)} value={response}/>
                        </div>
                    )}
                    
                    {questions[n].type === "BOOL" && (
                        <div className="p-5">
                            <div className={response !== "Oui" ? "bg-white m-2 text-center font-semibold rounded-xl p-2 w-2/3 mx-auto" : "bg-green-800 text-white m-2 text-center font-semibold rounded-xl p-2 w-2/3 mx-auto" } onClick={() => {setResponse("Oui")}}>Oui</div>
                            <div className={response !== "Non" ? "bg-white m-2 text-center font-semibold rounded-xl p-2 w-2/3 mx-auto" : "bg-green-800 text-white m-2 text-center font-semibold rounded-xl p-2 w-2/3 mx-auto" } onClick={() => setResponse("Non")}>Non</div>
                        </div>
                    )}
                    {questions[n].type === "R1" && (
                        <div className="p-5">
                            <div className={response !== "Très satisfaisant" ? "bg-white m-2 text-center font-semibold rounded-xl p-2 w-2/3 mx-auto" : "bg-green-800 text-white m-2 text-center font-semibold rounded-xl p-2 w-2/3 mx-auto" } onClick={() => setResponse("Très satisfaisant")}>Très satisfaisant</div>
                            <div className={response !== "Satisfaisant" ? "bg-white m-2 text-center font-semibold rounded-xl p-2 w-2/3 mx-auto" : "bg-green-800 text-white m-2 text-center font-semibold rounded-xl p-2 w-2/3 mx-auto" } onClick={() => setResponse("Satisfaisant")}>Satisfaisant</div>
                            <div className={response !== "Peu satisfaisant" ? "bg-white m-2 text-center font-semibold rounded-xl p-2 w-2/3 mx-auto" : "bg-green-800 text-white m-2 text-center font-semibold rounded-xl p-2 w-2/3 mx-auto" } onClick={() => setResponse("Peu satisfaisant")}>Peu satisfaisant</div>
                            <div className={response !== "Pas satisfait" ? "bg-white m-2 text-center font-semibold rounded-xl p-2 w-2/3 mx-auto" : "bg-green-800 text-white m-2 text-center font-semibold rounded-xl p-2 w-2/3 mx-auto" } onClick={() => setResponse("Pas satisfait")}>Pas satisfait</div>
                        </div>
                    )}
                    {questions[n].type === "R2" && (
                        <div className="p-5">
                            <div className={response !== "Jamais" ? "bg-white m-2 text-center font-semibold rounded-xl p-2 w-2/3 mx-auto" : "bg-green-800 text-white m-2 text-center font-semibold rounded-xl p-2 w-2/3 mx-auto" } onClick={() => setResponse("Jamais")}>Jamais</div>
                            <div className={response !== "Occasionnelles" ? "bg-white m-2 text-center font-semibold rounded-xl p-2 w-2/3 mx-auto" : "bg-green-800 text-white m-2 text-center font-semibold rounded-xl p-2 w-2/3 mx-auto" } onClick={() => setResponse("Occasionnelles")}>Occasionnelles</div>
                            <div className={response !== "Assez fréquentes" ? "bg-white m-2 text-center font-semibold rounded-xl p-2 w-2/3 mx-auto" : "bg-green-800 text-white m-2 text-center font-semibold rounded-xl p-2 w-2/3 mx-auto" } onClick={() => setResponse("Assez fréquentes")}>Assez fréquentes</div>
                            <div className={response !== "Toujours" ? "bg-white m-2 text-center font-semibold rounded-xl p-2 w-2/3 mx-auto" : "bg-green-800 text-white m-2 text-center font-semibold rounded-xl p-2 w-2/3 mx-auto" } onClick={() => setResponse("Toujours")}>Toujours</div>
                        </div>
                    )}
                    {questions[n].type === "NUMBER" && (
                        <div className="p-5 flex justify-center">
                            <input type="number" className='bg-white m-2 text-center font-semibold rounded-xl p-2 w-2/3 mx-auto' onChange={(e) => setResponse(e.target.value)} value={response}/>
                        </div>
                    )}
                    {questions[n].type === "TEXTAREA" && (
                        <div className="p-5 flex justify-center">
                            <textarea type="text" className='bg-white m-2 text-center font-semibold rounded-xl p-2 w-2/3 mx-auto' onChange={(e) => setResponse(e.target.value)} value={response}/>
                        </div>
                    )}
                    <div className='flex justify-around pb-8'>
                        {questions[n].rankOrder > 1 && <button onClick={prevQuestion} className='bg-[#317845] w-1/3 text-white font-bold rounded-xl p-2'>Précédent</button>}

                        {questions[n].rankOrder === questions.length -1 ? <button disabled={response === ""} className='bg-[#317845] w-1/3 text-white font-bold rounded-xl p-2 disabled:bg-[#22452d] disabled:text-gray-300' onClick={(e) =>handleSubmit(e)}>Envoyer le formulaire</button> : <button disabled={response === ""} onClick={nextQuestion} className='bg-[#317845] w-1/3 text-white font-bold rounded-xl p-2 disabled:bg-[#22452d] disabled:text-gray-300'>Suivant</button>}
                    </div>
                </div>
            </main>
        </>
    )
}