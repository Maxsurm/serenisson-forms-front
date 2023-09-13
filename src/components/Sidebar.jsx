import React from 'react'
import { Link } from 'react-router-dom'

export const Sidebar = () => {
    return (
        <div id="sidebar" className='h-full'>
        <aside className="flex w-72 flex-col space-y-2 border-r-2 border-gray-200 bg-slate-900 px-2 h-full pt-5" 
            x-show="asideOpen">
            <img className='mx-auto py-5' id="minilogo" src="/img/logo-mini.png" alt="" />
            <Link to="/admin/patients" className="flex items-center space-x-1 rounded-md px-2 py-3 text-white hover:bg-gray-100 hover:text-slate-900 font-bold text-lg">
                <span className="text-2xl"></span>
                <span>Patients</span>
            </Link>

            <Link to="/admin/questions" className="flex items-center space-x-1 rounded-md px-2 py-3 text-white hover:bg-gray-100 hover:text-slate-900 font-bold text-lg">
                <span className="text-2xl"></span>
                <span>Questions</span>
            </Link>
        </aside>
        </div>
    )
}
