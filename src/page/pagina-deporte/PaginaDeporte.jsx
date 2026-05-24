import './PaginaDeporte.css'

const reportUrl = 'https://lookerstudio.google.com/embed/reporting/e054b3f0-0ad8-42c7-8d03-acd9526f5f97'

const sanciones = [
    { title: 'Advertencia verbal', detail: 'Fútbol - aula B', state: 'Pendiente' },
    { title: 'Resolución emitida', detail: 'Ajedrez - expediente 22', state: 'Aplicada' },
    { title: 'Caso en revisión', detail: 'Natación - jornada vespertina', state: 'Revisión' },
]

function PaginaDeporte() {
    return (
        <div className="disciplinary-page">
            <div className="records-page__header">
                <div>
                    <p className="eyebrow">Control disciplinario</p>
                    <h2>Sanciones y resoluciones</h2>
                    <p>Espacio modular para seguimiento de incidencias y medidas aplicadas.</p>
                </div>
                <button type="button" className="button button--ghost">Generar resolución</button>
            </div>

            <section className="disciplinary-grid">
                {sanciones.map((item) => (
                    <article key={item.title} className="panel disciplinary-card">
                        <div>
                            <p className="disciplinary-card__title">{item.title}</p>
                            <p>{item.detail}</p>
                        </div>
                        <span className={item.state === 'Aplicada' ? 'status status--active' : 'status status--pending'}>
                            {item.state}
                        </span>
                    </article>
                ))}
            </section>

            <section className="panel">
                <div className="panel__header">
                    <div>
                        <h3>Flujo del expediente</h3>
                        <p>Bloque modular para integrar observaciones, documentos y firmas.</p>
                    </div>
                </div>

                <ol className="timeline">
                    <li>Recepción del reporte</li>
                    <li>Validación del caso</li>
                    <li>Emisión de resolución</li>
                    <li>Seguimiento posterior</li>
                </ol>
            </section>

        </div>
    )
}

export default PaginaDeporte;