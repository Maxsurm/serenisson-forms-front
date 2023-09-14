import { useEffect, useState } from 'react'
import axios from 'axios'
import Pagination from 'rc-pagination'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ListPatientsFilters } from '../components/ListPatientsFilters'
import { debounce } from 'lodash'
import { Link } from 'react-router-dom'

export const AdminPatients = () => {
    const [patients, setPatients] = useState([])
    const [error, setError] = useState(null)
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [patientsPerPage, setPatientsPerPage] = useState(15)
    const [totalPatients, setTotalPatients] = useState(0)

    const API_URL = `http://localhost:8080/admin/patients/${currentPage}/${patientsPerPage}${search?'/'+search:''}`

    const fetchPatients = async () => {
        try {
            const { data} = await axios.get(API_URL);
            setPatients(data.content);
            setTotalPatients(data.totalElements)
        } catch (error) {
            setError(error.message);
        }
    };


    // Debouncing : eviter trop d'appel API
    const debouncingFetchPatients = debounce(fetchPatients, 500)
    useEffect(() => {
            debouncingFetchPatients();
            return () => {
                debouncingFetchPatients.cancel()
            }
    }, [search])

    useEffect(() => {
        fetchPatients();
    }, [patientsPerPage, currentPage]);

    // une methode reset 
    const reset = () => {
        setSearch("")
        setCurrentPage(1)
        setPatientsPerPage(15)
    }
    // changer de page
    const handlePageChange = (pageNum) => {
        setCurrentPage(pageNum)
    }
    return (
        <main className='my-10 container mx-auto'>
            <h2 className='text-3xl font-bold mb-5'>Gestion des patients</h2>
            <Link to="/admin/patients/editer/0" className="bg-green-700 p-2 rounded-md text-white font-bold my-4 cus-btn" >Ajouter un patient</Link>
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
                    value={patientsPerPage}
                    onChange={(e) => {
                        setPatientsPerPage(e.target.value)
                        setCurrentPage(1)
                    }}
                    className="py-2 px-6 bg-gray-300 text-slate-700"
                    name="patientsPerPage"
                    id="patientsPerPage">
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                </select>
                {search.length > 1 && <button className="font-bold text-2xl text-green-700" onClick={reset}>X</button>}
            </div>

            {/* Listes des patients */}
                    <ListPatientsFilters
                        patients={patients}
                        error={error}
                    />

            {/* pagination */}
            <div className='my-10 flex justify-center '>
                <Pagination
                    current={currentPage}
                    total={totalPatients}
                    pageSize={patientsPerPage}
                    onChange={handlePageChange}
                    showTitle={false}
                    pageSizeOptions={[patientsPerPage.toString()]}
                    prevIcon={<FontAwesomeIcon className="text-green-500 text-xl" icon={faChevronLeft} />}
                    nextIcon={<FontAwesomeIcon className="text-green-500 text-xl" icon={faChevronRight} />}
                />
            </div>

        </main>
    )
}