import './PaginaConfiguracion.css'

const options = [
  { label: 'Tema visual', value: 'Administrativo claro' },
  { label: 'Modo de tabla', value: 'Compacto' },
  { label: 'Permisos', value: 'Superadministrador' },
]

export default function PaginaConfiguracion() {
  return (
    <div className="settings-page">
      <div className="records-page__header">
        <div>
          <p className="eyebrow">Configuración</p>
          <h2>Ajustes del sistema</h2>
          <p>Parámetros base para dejar cada módulo listo para crecer.</p>
        </div>
      </div>

      <section className="settings-grid">
        {options.map((option) => (
          <article key={option.label} className="panel settings-card">
            <span>{option.label}</span>
            <strong>{option.value}</strong>
          </article>
        ))}
      </section>

      <section className="panel settings-card settings-card--wide">
        <h3>Preferencias rápidas</h3>
        <p>
          Este espacio queda preparado para formularios, permisos, usuarios y cualquier módulo
          adicional que necesites conectar después.
        </p>
      </section>
    </div>
  )
}