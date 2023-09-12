import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";



export const FormPatients = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [message, setMessage] = useState('void')
    const API_URL = "http://localhost:8080/admin/patients"

    const sendPatientInfo = async (data) => {
        try {
            console.log(data);
            axios.post(API_URL, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

        } catch (err) {
            console.log(err)
        }
    }


    return (
        <>
            {message == 'success' &&
                <p className='bg-emerald-200 p-4 text-black text-center font-bold text-3xl mb-10 rounded-xl border-2 border-green-500'>Le patient {nom} {prenom} est bien enregistré </p>
            }

            {message == 'void' &&
                <p className='bg-white p-4 text-black text-center font-bold text-3xl mb-10 rounded-xl'>Veuillez enregistrer le nouveau patient</p>
            }

            {message == 'error' &&
                <p className='bg-red-200 p-4 text-black text-center font-bold text-3xl mb-10 rounded-xl border-2 border-red-500'>Les champs nom, prénom et email sont obligatoires !</p>
            }

            <div className='flex justify-center'>
                <form onSubmit={handleSubmit(sendPatientInfo)} className='bg-green-50 rounded-xl border border-slate-200 w-2/3 p-6'>
                    <div className='my-4'>
                        <label className="font-bold text-green-900 text-xl" htmlFor="name">Nom</label>
                        <input
                            {...register("nom", { required: true })}
                            id="nom" name="nom"
                            className='p-5 mt-3 w-full rounded-xl border border-slate-200'
                            type='text'
                            placeholder='Tapez le nom du patient ici' />
                        {errors.nom?.type === 'required' && <p className='text-red-500'>Le nom est obligatoire</p>}
                    </div>
                    <div className='my-4'>
                        <label className="font-bold text-green-900 text-xl" htmlFor="firstname">Prénom</label>
                        <input
                            {...register("prenom", { required: true })}
                            id="prenom" name="prenom"
                            className='p-5 mt-3 w-full rounded-xl border border-slate-200'
                            type='text'
                            placeholder='Tapez le prénom du patient ici' />
                        {errors.prenom?.type === 'required' && <p className='text-red-500'>Le prénom est obligatoire</p>}
                    </div>
                    <div className='my-4'>
                        <label className="font-bold text-green-900 text-xl" htmlFor="email">Email</label>
                        <input
                            {...register("email", { required: true })}
                            id="email" name="email"
                            className='p-5 mt-3 w-full rounded-xl border border-slate-200'
                            type='email'
                            placeholder="Tapez l'Email du patient ici " />
                        {errors.email?.type === 'required' && <p className='text-red-500'>L'email est obligatoire</p>}
                    </div>
                    <div className='flex justify-center'>

                        <button
                            className='bg-green-700 rounded-xl text-white font-bold py-3 px-5 text-2xl'
                            type='submit'>Valider</button>

                    </div>

                </form>

            </div>
        </>
    )
}
