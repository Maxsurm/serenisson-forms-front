
import { PatientLine } from './PatientLine';


export const ListPatientsFilters = ({ patients, error }) => {
    if (error) {
        return <p className="text-red-700 text-xl my-3 font-bold">Erreur : {error}</p>;
    }
    return (
        <>
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
                        patients.map((patient) => (
                            <PatientLine key={patient.id} patient={patient} />
                        ))
                    }
                </tbody>
            </table>
        </>

    )
}
