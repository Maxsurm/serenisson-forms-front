import { useEffect, useState } from 'react'
import axios from 'axios'
import Pagination from 'rc-pagination'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ListQuestions } from '../components/ListQuestions'
import { debounce } from 'lodash'
import { Link } from 'react-router-dom'

export const AdminQuestions = () => {
    const [questions, setQuestions] = useState([])
    const [error, setError] = useState(null)
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [questionsPerPage, setQuestionsPerPage] = useState(10)
    const [totalQuestions, setTotalQuestions] = useState(0)

    const API_URL = `http://localhost:8080/admin/questions/${currentPage}/${questionsPerPage}${search ? '/' + search : ''}`

    const fetchQuestions = async () => {
        try {
            const { data } = await axios.get(API_URL);
            setQuestions(data);
            setTotalQuestions(data.totalElements)
        } catch (error) {
            setError(error.message);
        }
    };


    // Debouncing : eviter trop d'appel API
    const debouncingFetchQuestions = debounce(fetchQuestions, 500)
    useEffect(() => {
            debouncingFetchQuestions();
            return () => {
                debouncingFetchQuestions.cancel()
        }
    }, [search])

    useEffect(() => {
        fetchQuestions();
    }, [questionsPerPage, currentPage]);

    // une methode reset 
    const reset = () => {
        setSearch("")
        setCurrentPage(1)
        setQuestionsPerPage(10)
    }
    // changer de page
    const handlePageChange = (pageNum) => {
        setCurrentPage(pageNum)
    }

    return (
        <main className='my-10 container mx-auto'>
            <h2 className='text-3xl font-bold mb-5'>Gestion des questions</h2>
            <Link to="/admin/questions/editer/0" className="bg-green-700 p-2 rounded-md text-white font-bold my-4 cus-btn" >Ajouter une question</Link>
            {/* FORM */}
            <div className="my-4 flex gap-6">
                <input
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value)
                        setCurrentPage(1)
                    }}
                    className=" py-2 mt-2 px-6 leading-none bg-gray-300 text-slate-700  focus:outline-none focus:border-green-700  border-b-2 border-green-50"
                    type='text'
                    placeholder="Que recherchez-vous ?" />

                {/* FORMULAIRE  */}
                <select
                    value={questionsPerPage}
                    onChange={(e) => {
                        setQuestionsPerPage(e.target.value)
                        setCurrentPage(1)
                    }}
                    className="py-2 px-6 bg-gray-300 text-slate-700"
                    name="questionsPerPage"
                    id="questionsPerPage">
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="25">25</option>
                </select>
                {search.length > 1 && <button className="font-bold text-2xl text-green-700" onClick={reset}>X</button>}
            </div>

            {/* Listes des questions */}
            {questions != "" ? <ListQuestions questions={questions} error={error}fetchQuestions={fetchQuestions}/> : <p className="text-center">Aucune question trouvée</p>}

            {/* pagination */}
            <div className='my-10 flex justify-center '>
                <Pagination
                    current={currentPage}
                    total={totalQuestions}
                    pageSize={questionsPerPage}
                    onChange={handlePageChange}
                    showTitle={false}
                    pageSizeOptions={[questionsPerPage.toString()]}
                    prevIcon={<FontAwesomeIcon className="text-green-500 text-xl" icon={faChevronLeft} />}
                    nextIcon={<FontAwesomeIcon className="text-green-500 text-xl" icon={faChevronRight} />}
                />
            </div>

        </main>
    )
}