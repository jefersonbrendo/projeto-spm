// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import SplashScreen from "./pages/SplashScreen";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";

import Home from "./pages/Home";
import Mapa from "./pages/Mapa";
import Leis from "./pages/Leis";
import Configuracoes from "./pages/Configuracoes";

import EditarPerfil from "./pages/EditarPerfil";
import Privacidade from "./pages/Privacidade";
import Termos from "./pages/Termos";
import Sobre from "./pages/Sobre";

import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

import AdicionarContato from "./components/contatos/AdicionarContatoModal";

import "leaflet/dist/leaflet.css";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* PÚBLICAS */}
          <Route path="/" element={<SplashScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />

          {/* PRIVADAS */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          <Route
            path="/mapa"
            element={
              <PrivateRoute>
                <Mapa />
              </PrivateRoute>
            }
          />

          <Route
            path="/leis"
            element={
              <PrivateRoute>
                <Leis />
              </PrivateRoute>
            }
          />

          <Route
            path="/configuracoes"
            element={
              <PrivateRoute>
                <Configuracoes />
              </PrivateRoute>
            }
          />

          {/* CONFIG SUB-PÁGINAS (TAMBÉM PRIVADAS) */}
          <Route
            path="/config/editar"
            element={
              <PrivateRoute>
                <EditarPerfil />
              </PrivateRoute>
            }
          />

          <Route
            path="/config/privacidade"
            element={
              <PrivateRoute>
                <Privacidade />
              </PrivateRoute>
            }
          />

          <Route
            path="/config/termos"
            element={
              <PrivateRoute>
                <Termos />
              </PrivateRoute>
            }
          />

          <Route
            path="/config/sobre"
            element={
              <PrivateRoute>
                <Sobre />
              </PrivateRoute>
            }
          />

          {/* CONTATOS */}
          <Route
            path="/adicionar-contato"
            element={
              <PrivateRoute>
                <AdicionarContato />
              </PrivateRoute>
            }
          />

          {/* REDIRECIONAMENTO */}
          <Route path="*" element={<Navigate to="/login" />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}
