import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Buscar from "./pages/busca";
import AppLayout from "./components/layouts/AppLayout";
import PerfilMentor from "./pages/perfil_mentor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="buscar" element={<Buscar />} />
          <Route path="buscar/perfil/:id" element={<PerfilMentor />} />
          <Route path="/listar/mentor" element={<PerfilMentor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
