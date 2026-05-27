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
            <section className="panel report-panel">
                <div className="report-panel__frame">
                    <iframe
                        width="600" height="300"
                        src={reportUrl}
                        title="Reporte de inscripciones deportivas"
                        loading="lazy"
                        allowFullScreen
                        sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                    />
                </div>
            </section>

        </div>
    )
}

export default PaginaInicio;