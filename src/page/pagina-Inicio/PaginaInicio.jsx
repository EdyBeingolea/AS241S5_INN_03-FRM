import './PaginaInicio.css'

const reportUrl = 'https://lookerstudio.google.com/embed/reporting/e054b3f0-0ad8-42c7-8d03-acd9526f5f97'

const stats = [
    { label: 'Total estudiantes', value: '1,248', detail: '+4.2% vs. mes anterior' },
    { label: 'Disciplinas', value: '14', detail: '12 activas' },
    { label: 'Resoluciones pend.', value: '37', detail: '-2% esta semana' },
    { label: 'Tasa de actividad', value: '92.4%', detail: 'Estado general alto' },
]

const monthly = [
    { month: 'ENE', value: 42 },
    { month: 'FEB', value: 68 },
    { month: 'MAR', value: 138 },
    { month: 'ABR', value: 102 },
    { month: 'MAY', value: 156 },
    { month: 'JUN', value: 191 },
    { month: 'JUL', value: 175 },
]

const activities = [
    'Nuevo registro: Diego Esliva - Ajedrez',
    'Resolución actualizada: Exp. #4592 - Fútbol',
    'Sanción aplicada: Carla M. - Atletismo',
    'Reporte mensual generado: Julio 2024',
]

const students = [
    { id: '31072025', name: 'Diego Esliva', discipline: 'Ajedrez', status: 'Activo' },
    { id: '02082025', name: 'Maria Quinteros', discipline: 'Fútbol', status: 'Activo' },
    { id: '05082025', name: 'Juan Carlos Pérez', discipline: 'Natación', status: 'Inactivo' },
]

function PaginaInicio() {
    return (
        <div className="dashboard-page">
            <div className="dashboard-page__hero">
                <div>
                    <p className="eyebrow">Resumen ejecutivo</p>
                    <h2>Panel de control académico</h2>
                    <p>Vista general del estado estudiantil y disciplinario.</p>
                </div>
                <div className="dashboard-page__hero-actions">
                    <button type="button" className="button button--ghost">Últimos 30 días</button>
                    <button type="button" className="button button--primary">+ Nuevo registro</button>
                </div>
            </div>

            <section className="panel report-panel">
                <div className="report-panel__frame">
                    <iframe
                        src={reportUrl}
                        title="Reporte de inscripciones deportivas"
                        loading="lazy"
                        allowFullScreen
                        sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                    />
                </div>
            </section>

            <section className="stats-grid" aria-label="Indicadores principales">
                {stats.map((stat) => (
                    <article key={stat.label} className="stat-card">
                        <p>{stat.label}</p>
                        <strong>{stat.value}</strong>
                        <span>{stat.detail}</span>
                    </article>
                ))}
            </section>

            <section className="dashboard-grid">
                <article className="panel panel--chart">
                    <div className="panel__header">
                        <div>
                            <h3>Distribución por disciplina</h3>
                            <p>Número de estudiantes inscritos actualmente.</p>
                        </div>
                        <button type="button" className="icon-button" aria-label="Más opciones">⋮</button>
                    </div>

                    <div className="chart-card" aria-hidden="true">
                        {monthly.map((point, index) => (
                            <div key={point.month} className="chart-card__point-group">
                                <div className="chart-card__bar" style={{ height: `${40 + point.value / 2}px` }}>
                                    <span className="chart-card__dot" style={{ bottom: `${point.value / 2}px` }} />
                                </div>
                                <span>{point.month}</span>
                                {index < monthly.length - 1 ? <i className="chart-card__link" /> : null}
                            </div>
                        ))}
                    </div>
                </article>

                <article className="panel panel--activity">
                    <div className="panel__header">
                        <div>
                            <h3>Actividad reciente</h3>
                            <p>Eventos importantes del sistema.</p>
                        </div>
                    </div>

                    <ul className="activity-list">
                        {activities.map((activity, index) => (
                            <li key={activity}>
                                <span className="activity-list__index">0{index + 1}</span>
                                <span>{activity}</span>
                            </li>
                        ))}
                    </ul>
                </article>
            </section>



            <section className="panel panel--table">
                <div className="panel__header">
                    <div>
                        <h3>Últimos alumnos registrados</h3>
                        <p>Movimientos más recientes del sistema académico.</p>
                    </div>
                    <button type="button" className="text-link">Ver todos los registros</button>
                </div>

                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th>Fecha-corte</th>
                                <th>Item</th>
                                <th>Nombre del estudiante</th>
                                <th>Disciplina</th>
                                <th>No. de resolución</th>
                                <th>Estado</th>
                                <th>Fecha de registro</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <tr key={student.id}>
                                    <td>{student.id}</td>
                                    <td>{index + 1}</td>
                                    <td className="table-wrap__strong">{student.name}</td>
                                    <td>{student.discipline}</td>
                                    <td>Resolución N° 2023-0{index + 4}</td>
                                    <td>
                                        <span className={student.status === 'Activo' ? 'status status--active' : 'status status--inactive'}>
                                            {student.status}
                                        </span>
                                    </td>
                                    <td>0{index + 1}/09/2014</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    )
}

export default PaginaInicio;