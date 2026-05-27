import React, { useEffect, useMemo, useState } from 'react'
import './PaginaDeporte.css'
import { listaDeportes } from '../../core/service/deporteService'

function PaginaDeporte() {
    const [deportes, setDeportes] = useState([])
    const [totalPersonas, setTotalPersonas] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [paginaActual, setPaginaActual] = useState(1)
    const PAGE_SIZE_OPTIONS = [6, 12, 24]
    const [limite, setLimite] = useState(12)

    useEffect(() => {
        const cargar = async () => {
            try {
                setLoading(true)
                const res = await listaDeportes()
                setDeportes(Array.isArray(res?.data) ? res.data : [])
                setTotalPersonas(res?.total_personas || 0)
                setError(null)
            } catch (err) {
                setError(err.message || 'Error al cargar deportes')
            } finally {
                setLoading(false)
            }
        }

        cargar()
    }, [])

    const topDeporte = useMemo(() => {
        if (!deportes.length) return 'Sin datos'
        return deportes[0].nombre
    }, [deportes])

    const renderPaginationButtons = () => {
        const totalPaginas = Math.max(1, Math.ceil(deportes.length / limite))
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
                onClick={() => setPaginaActual(page)}
                disabled={loading}
            >
                {page}
            </button>
        ))
    }

    let listContent

    if (loading) {
        listContent = <p>Cargando deportes...</p>
    } else if (error) {
        listContent = <p className="text-error">Error: {error}</p>
    } else if (deportes.length === 0) {
        listContent = <p>No hay deportes para mostrar.</p>
    } else {
        const perPage = limite
        const start = (paginaActual - 1) * perPage
        const pageItems = deportes.slice(start, start + perPage)
        const placeholders = perPage - pageItems.length

        listContent = (
            <section className="disciplinary-grid">
                {pageItems.map((item, index) => (
                    <article key={item.id} className="panel disciplinary-card">
                        <div>
                            <p className="disciplinary-card__title">{item.nombre}</p>
                            <p className="disciplinary-card__detail">{item.cantidad} inscritos</p>
                        </div>
                        <span className={start + index < 3 ? 'disciplinary-rank disciplinary-rank--top' : 'disciplinary-rank'}>
                            #{start + index + 1}
                        </span>
                    </article>
                ))}

                {Array.from({ length: placeholders }).map((_, i) => {
                    const key = `empty-${paginaActual}-${i + 1}`
                    return <article key={key} className="panel disciplinary-card disciplinary-card--empty" />
                })}
            </section>
        )
    }

    return (
        <div className="disciplinary-page">
            <div className="disciplinary-hero">
                <div className="disciplinary-hero__copy">
                    <p className="eyebrow">Reporte de deportes</p>
                    <h2>Inscripciones por disciplina</h2>
                </div>
                <div className="disciplinary-hero__stats">
                    <article className="disciplinary-stat">
                        <span>Total personas</span>
                        <strong>{totalPersonas}</strong>
                    </article>
                    <article className="disciplinary-stat">
                        <span>Disciplinas</span>
                        <strong>{deportes.length}</strong>
                    </article>
                    <article className="disciplinary-stat">
                        <span>Top disciplina</span>
                        <strong>{topDeporte}</strong>
                    </article>
                </div>
            </div>

            {listContent}

            <div className="deportepage-footer">
                <div className="pagination-panel__group">
                    <span className="pagination-panel__label">Filas por página</span>
                    <select
                        className="pagination-select"
                        value={limite}
                        onChange={(e) => { setLimite(Number(e.target.value)); setPaginaActual(1) }}
                        disabled={loading}
                    >
                        {PAGE_SIZE_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>

                <div className="pagination-controls">
                    <button className="chip" type="button" onClick={() => setPaginaActual(Math.max(1, paginaActual - 1))} disabled={paginaActual <= 1}>Atrás</button>
                    {renderPaginationButtons()}
                    <button className="chip" type="button" onClick={() => setPaginaActual(Math.min(Math.ceil(deportes.length / limite), paginaActual + 1))} disabled={paginaActual >= Math.ceil(deportes.length / limite)}>Adelante</button>
                </div>

                <div className="deportepage-update">Última actualización: hace 5 minutos</div>

              
            </div>

        </div>
    )
}

export default PaginaDeporte