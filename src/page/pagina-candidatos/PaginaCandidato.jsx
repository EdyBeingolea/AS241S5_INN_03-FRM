import React, { useEffect, useState } from 'react'
import './PaginaCandidato.css'
import { listaCandidato } from '../../core/service/candidatoService'
import CandidatoVerDetalle from './ver-detalle/candidato-ver-detalle'

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50]

function PaginaCandidato() {
    const [registros, setRegistros] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [paginaActual, setPaginaActual] = useState(1)
    const [totalPaginas, setTotalPaginas] = useState(1)
    const [totalRegistros, setTotalRegistros] = useState(0)
    const [limite, setLimite] = useState(10)
    const [estadoFiltro, setEstadoFiltro] = useState('todos')
    const [detalleAbierto, setDetalleAbierto] = useState(false)
    const [candidatoSeleccionado, setCandidatoSeleccionado] = useState(null)

    const cargarRegistros = async (pagina = 1, pageSize = limite, filtro = estadoFiltro) => {
        try {
            setLoading(true)
            const res = await listaCandidato(pagina, pageSize, filtro)
            setRegistros(Array.isArray(res?.data) ? res.data : [])
            setPaginaActual(res?.pagina_actual || pagina)
            setTotalPaginas(res?.total_paginas || 1)
            setTotalRegistros(res?.cantidad_total || 0)
            setError(null)
        } catch (err) {
            setError(err.message || 'Error')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        cargarRegistros(paginaActual, limite, estadoFiltro)
    }, [paginaActual, limite, estadoFiltro])

    const goToPage = (page) => {
        const nextPage = Math.min(Math.max(1, page), totalPaginas)
        setPaginaActual(nextPage)
    }

    const handleLimitChange = (event) => {
        setLimite(Number(event.target.value))
        setPaginaActual(1)
    }

    const handleFilterChange = (nextFilter) => {
        setEstadoFiltro(nextFilter)
        setPaginaActual(1)
    }

    const abrirDetalle = (registro) => {
        setCandidatoSeleccionado(registro)
        setDetalleAbierto(true)
    }

    const cerrarDetalle = () => {
        setDetalleAbierto(false)
        setCandidatoSeleccionado(null)
    }

    let tableContent

    if (loading) {
        tableContent = <p>Cargando registros...</p>
    } else if (error) {
        tableContent = <p className="text-error">Error: {error}</p>
    } else {
        tableContent = (
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
                        <tr key={registro.key}>
                            <td className="table-wrap__strong">{registro.deportista}</td>
                            <td>{registro.deporte}</td>
                            <td>{registro.resolucion}</td>
                            <td>
                                <span className={registro.estado === 'Activo' ? 'status status--active' : 'status status--pending'}>
                                    {registro.estado}
                                </span>
                            </td>
                            <td>
                                <button type="button" className="text-link" onClick={() => abrirDetalle(registro)}>
                                    Ver
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }

    const renderPaginationButtons = () => {
        const maxButtons = 5
        const halfWindow = Math.floor(maxButtons / 2)
        let startPage = Math.max(1, paginaActual - halfWindow)
        let endPage = Math.min(totalPaginas, startPage + maxButtons - 1)

        if (endPage - startPage + 1 < maxButtons) {
            startPage = Math.max(1, endPage - maxButtons + 1)
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((page) => (
            <button
                key={page}
                type="button"
                className={`chip pagination-chip ${page === paginaActual ? 'pagination-chip--active' : ''}`}
                onClick={() => goToPage(page)}
                disabled={loading}
            >
                {page}
            </button>
        ))
    }

    return (
        <div className="records-page">
            <div className="records-page__header">
                <div>
                    <h2>Registros estudiantiles</h2>
                    <p>Alta, edición y seguimiento de candidatos inscritos.</p>
                </div>
{/*                 <button type="button" className="button button--primary">Crear registro</button>
 */}            </div>

            <section className="records-grid">
                <article className="panel">
                    <h3>Filtros rápidos</h3>
                    <div className="chip-row">
                        <button
                            type="button"
                            className={`chip ${estadoFiltro === 'todos' ? 'chip--active' : ''}`}
                            onClick={() => handleFilterChange('todos')}
                        >
                            Todos
                        </button>
                        <button
                            type="button"
                            className={`chip ${estadoFiltro === 'activo' ? 'chip--active' : ''}`}
                            onClick={() => handleFilterChange('activo')}
                        >
                            Activos
                        </button>
                        <button
                            type="button"
                            className={`chip ${estadoFiltro === 'no activo' ? 'chip--active' : ''}`}
                            onClick={() => handleFilterChange('no activo')}
                        >
                            Inactivos
                        </button>
                    </div>
                </article>

                <article className="panel">
                    <h3>Resumen</h3>
                    <p className="records-page__metric">{totalRegistros} estudiantes cargados</p>
                    <p className="records-page__helper">Datos consumidos directamente desde el servicio.</p>
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
                    {tableContent}
                </div>

                <div className="pagination-panel">
                    <div className="pagination-panel__group">
                        <span className="pagination-panel__label">Filas por página</span>
                        <select className="pagination-select" value={limite} onChange={handleLimitChange} disabled={loading}>
                            {PAGE_SIZE_OPTIONS.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>

                    <div className="pagination-panel__controls">
                        <button
                            type="button"
                            className="chip pagination-chip"
                            onClick={() => goToPage(paginaActual - 1)}
                            disabled={loading || paginaActual <= 1}
                        >
                            Atrás
                        </button>

                        {renderPaginationButtons()}

                        <button
                            type="button"
                            className="chip pagination-chip"
                            onClick={() => goToPage(paginaActual + 1)}
                            disabled={loading || paginaActual >= totalPaginas}
                        >
                            Adelante
                        </button>
                    </div>

                    <span className="pagination-panel__info">
                        Página {paginaActual} de {totalPaginas}
                    </span>
                </div>
            </section>

            <CandidatoVerDetalle
                open={detalleAbierto}
                candidato={candidatoSeleccionado}
                onClose={cerrarDetalle}
            />
        </div>
    )
}

export default PaginaCandidato