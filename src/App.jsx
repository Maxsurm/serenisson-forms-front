import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import { AdminHome } from "./views/AdminHome";
import { AdminPatients } from "./views/AdminPatients";
import { FrontClient } from "./views/FrontClient";
import { Sidebar } from "./components/Sidebar";

const App = () => {
  const location = window.location;

  return (
    <BrowserRouter>
      {/* SI ON EST DANS L'ADMIN */}.
      {location.pathname.includes("/admin") &&
        <>
          <Sidebar />
          <a href="/admin">
            <img src="../../public/img/Logo.png" alt="Lien vers l'accueil - Logo Serenisson" />
          </a>
        </>
      }
      <Routes>
        <Route path="/" element={<FrontClient />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/patients" element={<AdminPatients />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App