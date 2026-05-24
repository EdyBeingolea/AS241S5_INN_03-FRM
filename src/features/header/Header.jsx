import './Header.css'

export default function Header() {
  return (
    <header className="topbar">
      <label className="topbar__search" aria-label="Buscar estudiante o registro">
        <span>⌕</span>
        <input type="search" placeholder="Buscar estudiante o registro..." />
      </label>

      <div className="topbar__actions">
        <button type="button" className="topbar__icon-button" aria-label="Notificaciones">!</button>
        <button type="button" className="topbar__icon-button" aria-label="Ayuda">?</button>
        <div className="topbar__profile">
          <div className="topbar__avatar">AU</div>
          <div>
            <strong>Admin Usuario</strong>
            <span>Superadministrador</span>
          </div>
        </div>
      </div>
    </header>
  )
}