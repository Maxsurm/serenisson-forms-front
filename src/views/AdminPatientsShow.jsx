import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const AdminPatientsShow = () => {

  const [patient, setPatient] = useState(null)
  const [error, setError] = useState(null)


  const param = useParams()

  const API_URL = `http://localhost:8080/admin/patients/${param.id}`

  const fetchPatient = async () => {

    try {
      const { data } = await axios.get(API_URL)
      console.log(data);
      setPatient(data)
    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(() => {
    fetchPatient()
  }, [])

  if (error) {
    return (
      <p className="text-red-700 text-xl my-3 font-bold">Erreur : {error}</p>
    );
  }


  return (
    <>
      {patient &&
        <main>
          <div className="flex justify-center">
            <div className="w-2/3">
              <h2 className="text-3xl font-bold mb-5">Détails du patient</h2>
              <div className="container border p-5 rounded-xl bg-green-50">
                <h3 className="text-2xl font-bold mb-5">infos du patient</h3>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">
                    Nom : {patient.nom}
                  </div>
                  <div className="px-4 py-2 font-semibold">
                    Prenom : {patient.prenom}
                  </div>
                </div>
                <div className="px-4 py-2 font-semibold">
                  Email: {patient.mail}
                </div>
                <h3 className="text-2xl font-bold my-5">Formulaires du patient</h3>
                {/* LES FORMULAIRES  */}
              </div>
            </div>
          </div>
        </main>
      }
    </>
  )
}
