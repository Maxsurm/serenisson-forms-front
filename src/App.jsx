import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import "./assets/App.css";
import { Sidebar } from "./components/Sidebar";


import { AdminHome } from "./views/AdminHome";
import { AdminPatients } from "./views/AdminPatients";
import { FrontClient } from "./views/FrontClient";
import { NotFound } from "./views/NotFound";
import { AdminPatientsAdd } from "./views/AdminPatientsAdd";
import { AdminPatientsEdit } from "./views/AdminPatientsEdit";
import { AdminPatientsShow } from "./views/AdminPatientsShow";

const App = () => {
  const location = window.location;

  return (
    <BrowserRouter>
      {/* SI ON EST DANS L'ADMIN */}
      {location.pathname.includes("/admin") &&
        <div id="admin-template" className="flex">
          <Sidebar />
          <div className="w-full">
            <div className="mx-auto ">
              <a className="mx-auto flex justify-center my-5" href="/admin">
                <img className="" width="25%" src="../../public/img/Logo.png" alt="Lien vers l'accueil - Logo Serenisson" />
              </a>
            </div>
            {/*====================================================== //
            // ======================= CONTENT ====================== //
            // ====================================================== */}
            <main className="px-5">
              <Routes>
                <Route path="/admin" element={<AdminHome />} />
                <Route path="/admin/patients" element={<AdminPatients />} />
                <Route path="/admin/patients/ajouter" element={<AdminPatientsAdd />} />
                <Route path="/admin/patients/modifier" element={<AdminPatientsEdit />} />
                <Route path="/admin/patients/voir" element={<AdminPatientsShow />} />

                <Route path="/admin/*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </div>
      }
      <Routes>
        <Route path="/" element={<FrontClient />} />
        {!location.pathname.includes("/admin") &&
          <Route path="*" element={<NotFound />} />
        }
      </Routes>
    </BrowserRouter>
  )
}

export default App