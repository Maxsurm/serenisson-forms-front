import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'


export const FrontClient = () => {


    // "BOOL= Oui, Non"
// "R1= Très satisfaisant , satisfaisant, peu satisfaisant, pas satisfait "
// "R2= jamais, occasionnelles, assez fréquentes, toujours"

    const [questions,setQuestions] = useState([])

    const param = useParams()

// recuperation des questions 
    const API_URL = `http://localhost:8080/admin/questions/form/${param.formulaire}`
    ///question/{formulaire}/{rang}
    console.log(param)

    const fetchQuestions = async () => {
        try {
            const { data } = await axios.get(API_URL);
            console.log("data" , data)
            setQuestions(data);
            console.log("questions",questions)
        } catch (error) {
            setError(error.message);
        }
        
    };
    

    useEffect(() => {
        fetchQuestions();
    }, []);
    
// voir btn precedent a supp qd 1ere questions 


// recuperation des reponses



    return (
        <>
            <header>
                <img id="big-logo" src="/public/img/Logo.png" alt="logo" />
            </header>
            <main className='flex justify-center my-20'>
                <div className="bg-[#DBFFD6] rounded-2xl sm:w-5/6 sm:mx-5 lg:w-1/2">
                    <div className="bg-[#50A34E] rounded-t-2xl text-white font-bold px-5 py-2">
                        {/* <h1 className='text-center'>{questions[0].question}</h1> */}
                    </div>
                    <div className="p-5 flex justify-center">
                        <input type="text" className='bg-white m-2 text-center font-semibold rounded-xl p-2 w-2/3 mx-auto' />

                        {/* <div className="bg-white m-2 text-center font-semibold rounded-xl p-2 w-2/3 mx-auto">Choix 1</div> */}
                    
                    </div>
                    <div className='flex justify-around pb-8'>
                        <button className='bg-[#317845] w-1/3 text-white font-bold rounded-xl p-2'>Précédent</button>
                        <button className='bg-[#317845] w-1/3 text-white font-bold rounded-xl p-2'>Suivant</button>
                    </div>
                </div>
            </main>
        </>
    )
}