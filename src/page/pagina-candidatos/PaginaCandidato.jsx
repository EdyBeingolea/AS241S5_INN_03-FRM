import './PaginaCandidato.css'

const registros = [
    { student: 'Diego Esliva', discipline: 'Ajedrez', code: 'RES-2024-01', status: 'Activo' },
    { student: 'Maria Quinteros', discipline: 'Fútbol', code: 'RES-2024-02', status: 'Activo' },
    { student: 'Juan Carlos Pérez', discipline: 'Natación', code: 'RES-2024-03', status: 'Pendiente' },
    { student: 'Ana Torres', discipline: 'Vóley', code: 'RES-2024-04', status: 'Revisión' },
]

function PaginaCandidato() {
    return (
        <div className="records-page">
            <div className="records-page__header">
                <div>
                    <p className="eyebrow">Gestión modular</p>
                    <h2>Registros estudiantiles</h2>
                    <p>Alta, edición y seguimiento de estudiantes inscritos.</p>
                </div>
                <button type="button" className="button button--primary">Crear registro</button>
            </div>

            <section className="records-grid">
                <article className="panel">
                    <h3>Filtros rápidos</h3>
                    <div className="chip-row">
                        <button type="button" className="chip chip--active">Todos</button>
                        <button type="button" className="chip">Activos</button>
                        <button type="button" className="chip">Pendientes</button>
                        <button type="button" className="chip">Revisión</button>
                    </div>
                </article>

                <article className="panel">
                    <h3>Resumen</h3>
                    <p className="records-page__metric">1248 estudiantes cargados</p>
                    <p className="records-page__helper">Los módulos están listos para conectar un backend o almacenamiento local.</p>
                </article>
            </section>

            <section className="panel">
                <div className="panel__header">
                    <div>
                        <h3>Listado de registros</h3>
                        <p>Tabla preparada para acciones por fila.</p>
                    </div>
                </div>

                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th>Estudiante</th>
                                <th>Disciplina</th>
                                <th>Código</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registros.map((registro) => (
                                <tr key={registro.code}>
                                    <td className="table-wrap__strong">{registro.student}</td>
                                    <td>{registro.discipline}</td>
                                    <td>{registro.code}</td>
                                    <td>
                                        <span className={registro.status === 'Activo' ? 'status status--active' : 'status status--pending'}>
                                            {registro.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button type="button" className="text-link">Ver</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    )
}

export default PaginaCandidato;