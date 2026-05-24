import './Sidebar.css'

function Icon({ type }) {
    switch (type) {
        case 'summary':
            return (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 5.5h7v7H4zM13 5.5h7v4h-7zM13 11.5h7v7h-7zM4 14.5h7v4H4z" />
                </svg>
            )
        case 'records':
            return (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6 4.5h12v15H6z" />
                    <path d="M9 8.5h6M9 12.5h6M9 16.5h4" />
                </svg>
            )
        case 'disciplinary':
            return (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 4.5 20 19.5H4z" />
                    <path d="M12 9v4" />
                    <circle cx="12" cy="16" r="1" />
                </svg>
            )
        case 'settings':
            return (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M9.2 4.8h5.6l.7 2.3 2.2 1.3-.4 2.4 1.5 2-1.5 2 .4 2.4-2.2 1.3-.7 2.3H9.2l-.7-2.3-2.2-1.3.4-2.4-1.5-2 1.5-2-.4-2.4 2.2-1.3z" />
                    <circle cx="12" cy="12" r="2.5" />
                </svg>
            )
        default:
            return null
    }
}

function Sidebar({ items, activeItem, onNavigate }) {
    return (
        <aside className="sidebar">
            <div className="sidebar__brand">
                <div className="sidebar__mark">SA</div>
                <div>
                    <h1>SISTEMA ACADÉMICO</h1>
                    <p>Panel administrativo</p>
                </div>
            </div>

            <nav className="sidebar__nav" aria-label="Navegación principal">
                {items.map((item) => {
                    const isActive = item.id === activeItem

                    return (
                        <button
                            key={item.id}
                            type="button"
                            className={isActive ? 'sidebar__item sidebar__item--active' : 'sidebar__item'}
                            onClick={() => onNavigate(item.id)}
                        >
                            <span className="sidebar__icon">
                                <Icon type={item.icon} />
                            </span>
                            <span className="sidebar__label">{item.label}</span>
                        </button>
                    )
                })}
            </nav>

            <div className="sidebar__footer">
                <button type="button" className="sidebar__export">
                    Exportar reporte
                </button>
                <button type="button" className="sidebar__logout">
                    Cerrar sesión
                </button>
            </div>
        </aside>
    )
}

export default Sidebar;