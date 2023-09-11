import React from 'react'
import { Link } from 'react-router-dom'

export const Sidebar = () => {
    return (
        <aside className="flex w-72 flex-col space-y-2 border-r-2 border-gray-200 bg-slate-900 p-2 h-full fixed top-0 left-0" 
            x-show="asideOpen">
            <Link to="/admin/patients" className="flex items-center space-x-1 rounded-md px-2 py-3 text-white hover:bg-gray-100 hover:text-slate-900 font-bold text-lg">
                <span className="text-2xl"></span>
                <span>Patients</span>
            </Link>

            <Link to="#" className="flex items-center space-x-1 rounded-md px-2 py-3 text-white hover:bg-gray-100 hover:text-slate-900 font-bold text-lg">
                <span className="text-2xl"></span>
                <span>Questions</span>
            </Link>
        </aside>
    )
}
