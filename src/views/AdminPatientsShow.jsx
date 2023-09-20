import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BackBtn } from '../components/BackBtn'

export const AdminPatientsShow = () => {

  const [patient, setPatient] = useState(null)
  const [error, setError] = useState(null)
  const [formulaires, setFormulaires] = useState([])


  const param = useParams()

  const API_URL = `http://localhost:8080/admin/patients/${param.id}`
  const FORM_URL = `http://localhost:8080/admin/patients/sendform`
  const GET_FORM_URL = `http://localhost:8080/admin/patients/getform`

  const fetchPatient = async () => {
    try {
      const { data } = await axios.get(API_URL)
      setPatient(data) 
    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(() => {
    fetchPatient()
  }, [])

  const sendForm = async (formName) => {
    try {
      const url = `${FORM_URL}/${formName}/${param.id}`
      const { data } = await axios.get(url)
      
      setFormulaires(data)
    } catch (error) {
      setError(error.message)
    }
  }

  const getForm = async (formName) => {
    try {
      const geturl = `${GET_FORM_URL}/${formName}/${param.id}`
      const response = await axios.get(geturl, {
        responseType: 'blob', // Spécifie que la réponse est un blob (fichier)
      });
      // Créez un objet URL à partir du blob pour créer un lien de téléchargement
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      // Créez un lien pour déclencher le téléchargement
      const link = document.createElement('a');
      
      link.href = url;
      link.setAttribute('download', response.headers["x-suggested-filename"]);
      // Simulez un clic sur le lien pour déclencher le téléchargement
      link.click();
      // Libérez l'URL de l'objet blob
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setError(error.message);
    }
  };

  





  if (error) {
    return (
      <p className="text-red-700 text-xl my-3 font-bold">Erreur : {error}</p>
    );
  }


  return (
    <>
      {patient &&
        <main>
          <BackBtn />
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
                <div className='flex justify-around pb-8'>
                  {patient.anapath === null ? <button  onClick={()=>{sendForm("ANAMNESE")}} className='bg-[#317845] w-1/3 text-white font-bold rounded-xl p-2'>Envoyer Anamnèse</button> : <button onClick={()=>{getForm("ANAMNESE")}} className='bg-[#317845] w-1/3 text-white font-bold rounded-xl p-2'>Télécharger Anamnèse</button>}
                  {patient.sixpath === null ? <button  onClick={()=>{sendForm("SIXMOIS")}} className='bg-[#317845] w-1/3 text-white font-bold rounded-xl p-2'>Envoyer Formulaire Six mois</button> : <button onClick={()=>{getForm("SIXMOIS")}} className='bg-[#317845] w-1/3 text-white font-bold rounded-xl p-2'>Télécharger Formulaire six mois</button>}
                </div>
              </div>
            </div>
          </div>
        </main>
      }
    </>
  )
}
