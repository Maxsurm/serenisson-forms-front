import React from 'react'

export const FrontEndForm = () => {
  return (
    <body>     
        <header>
                <img id="big-logo" src="/public/img/Logo.png" alt="logo" />
            </header>
            <main className='flex justify-center my-20'>
                <div className="bg-[#DBFFD6] rounded-2xl sm:w-5/6 sm:mx-5 lg:w-1/2 shadow-lg shadow-slate-500">
                <h1>Merci d'avoir rempli le questionnaire, celui-ci à été envoyé à votre Audioprothesiste</h1>
                <p>A bientot chez serenisson</p>
                </div>
            </main>
    </body>
  )
}
