import { useState } from 'react'
import './App.css'
import Header from './features/header/Header.jsx'
import Sidebar from './features/sidebar/Sidebar.jsx'
import { NAV_ITEMS } from './shared/navigation.js'
import PaginaInicio from './page/pagina-Inicio/PaginaInicio.jsx'
import PaginaCandidato from './page/pagina-candidatos/PaginaCandidato.jsx'
import PaginaDeporte from './page/pagina-deporte/PaginaDeporte.jsx'
import PaginaConfiguracion from './page/pagina-configuracion/PaginaConfiguracion.jsx'

const PAGES = {
  resumen: PaginaInicio,
  registros: PaginaCandidato,
  disciplinario: PaginaDeporte,
  configuracion: PaginaConfiguracion,
}

export default function App() {
  const [activePage, setActivePage] = useState('resumen')
  const ActivePage = PAGES[activePage] ?? PaginaInicio

  return (
    <div className="app-shell">
      <Sidebar
        items={NAV_ITEMS}
        activeItem={activePage}
        onNavigate={setActivePage}
      />

      <main className="app-main">
        <Header />
        <section className="app-content">
          <ActivePage />
        </section>
      </main>
    </div>
  )
}