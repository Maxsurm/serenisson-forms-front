import React, { useState } from "react"



export const FormPatients = () => {

    const [message, setMessage] = useState('void')
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [email, setEmail] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (nom !== '' && prenom !== '' && email !== '') {
            setMessage('success')
        } else {
            setMessage('error')
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
                <p className='text-lg'>{nom}</p>
                <form onSubmit={handleSubmit} className='bg-green-50 rounded-xl border border-slate-200 w-2/3 p-6'>
                    <div className='my-4'>
                        <label className="font-bold text-green-900 text-xl" htmlFor="name">Nom</label>
                        <input
                            onChange={(e) => setPrenom(e.target.value)}
                            value={prenom}
                            className='p-5 mt-3 w-full rounded-xl border border-slate-200'
                            type='text'
                            placeholder='Tapez le nom du patient ici' />
                    </div>
                    <div className='my-4'>
                        <label className="font-bold text-green-900 text-xl" htmlFor="firstname">Prénom</label>
                        <input
                            onChange={(e) => setNom(e.target.value)}
                            value={nom}
                            className='p-5 mt-3 w-full rounded-xl border border-slate-200'
                            type='text'
                            placeholder='Tapez le prénom du patient ici' />
                    </div>

                    <div className='my-4'>
                        <label className="font-bold text-green-900 text-xl" htmlFor="email">Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className='p-5 mt-3 w-full rounded-xl border border-slate-200'
                            type='email'
                            placeholder="Tapez l'Email du patient ici "/>
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
