import { QuestionLine } from './QuestionLine';


export const ListQuestions = ({ questions, error, fetchQuestions }) => {
    if (error) {
        return <p className="text-red-700 text-xl my-3 font-bold">Erreur : {error}</p>;
    }
    return (
        <>
            <table className='w-full  mt-5 '>
                <thead >
                    <tr className="">
                        <th className="border-e border-gray-300 py-2 bg-green-700 text-white rounded-tl-xl" >Rang</th>
                        <th className="border-e border-gray-300 py-2 bg-green-700 text-white " >Question</th>
                        <th className="border-e border-gray-300 py-2 bg-green-700 text-white " >Type</th>
                        <th className="border-e border-gray-300 py-2 bg-green-700 text-white " >Formulaire</th>
                        <th className="border-gray-300 py-2 bg-green-700 text-white rounded-tr-xl" >Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        questions.map((question) => (
                            <QuestionLine key={question.id} question={question} fetchQuestions={fetchQuestions} />
                        ))
                    }
                </tbody>
            </table>
        </>

    )
}
