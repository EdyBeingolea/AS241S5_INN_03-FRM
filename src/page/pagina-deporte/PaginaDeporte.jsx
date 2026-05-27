import React, { useEffect, useMemo, useState } from 'react'
import './PaginaDeporte.css'
import { listaDeportes } from '../../core/service/deporteService'

function PaginaDeporte() {
    const [deportes, setDeportes] = useState([])
    const [totalPersonas, setTotalPersonas] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

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

    let listContent

    if (loading) {
        listContent = <p>Cargando deportes...</p>
    } else if (error) {
        listContent = <p className="text-error">Error: {error}</p>
    } else if (deportes.length === 0) {
        listContent = <p>No hay deportes para mostrar.</p>
    } else {
        listContent = (
            <section className="disciplinary-grid">
                {deportes.map((item, index) => (
                    <article key={item.id} className="panel disciplinary-card">
                        <div>
                            <p className="disciplinary-card__title">{item.nombre}</p>
                            <p className="disciplinary-card__detail">{item.cantidad} inscritos</p>
                        </div>
                        <span className={index < 3 ? 'disciplinary-rank disciplinary-rank--top' : 'disciplinary-rank'}>
                            #{index + 1}
                        </span>
                    </article>
                ))}
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

        </div>
    )
}

export default PaginaDeporte