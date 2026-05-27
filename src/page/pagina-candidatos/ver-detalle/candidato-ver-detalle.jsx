/* eslint-disable react/prop-types */

import './candidato-ver-detalle.css'

function CandidatoVerDetalle({ open, candidato, onClose }) {
    if (!open || !candidato) {
        return null
    }

    return (
        <dialog className="candidate-modal" open aria-modal="true" aria-labelledby="candidate-modal-title">
            <div className="candidate-modal__panel">
                <div className="candidate-modal__header">
                    <div>
                        <p className="candidate-modal__eyebrow">Detalle del candidato</p>
                        <h3 id="candidate-modal-title">{candidato.deportista}</h3>
                    </div>
                    <button type="button" className="candidate-modal__close" onClick={onClose} aria-label="Cerrar modal">
                        ×
                    </button>
                </div>

                <div className="candidate-modal__grid">
                    <div className="candidate-modal__field">
                        <span className="candidate-modal__label">Item</span>
                        <strong>{candidato.item}</strong>
                    </div>
                    <div className="candidate-modal__field">
                        <span className="candidate-modal__label">Fecha de corte</span>
                        <strong>{candidato.fecha_corte}</strong>
                    </div>
                    <div className="candidate-modal__field candidate-modal__field--full">
                        <span className="candidate-modal__label">Deportista</span>
                        <strong>{candidato.deportista}</strong>
                    </div>
                    <div className="candidate-modal__field">
                        <span className="candidate-modal__label">Deporte</span>
                        <strong>{candidato.deporte}</strong>
                    </div>
                    <div className="candidate-modal__field">
                        <span className="candidate-modal__label">Estado</span>
                        <strong className={candidato.estado === 'Activo' ? 'candidate-modal__status candidate-modal__status--active' : 'candidate-modal__status candidate-modal__status--inactive'}>
                            {candidato.estado}
                        </strong>
                    </div>
                    <div className="candidate-modal__field candidate-modal__field--full">
                        <span className="candidate-modal__label">Resolución</span>
                        <strong>{candidato.resolucion}</strong>
                    </div>
                    <div className="candidate-modal__field">
                        <span className="candidate-modal__label">Fecha de registro</span>
                        <strong>{candidato.fecha_registro}</strong>
                    </div>
                    <div className="candidate-modal__field candidate-modal__field--full">
                        <span className="candidate-modal__label">Observación</span>
                        <strong>{candidato.observacion || 'Sin observación'}</strong>
                    </div>
                </div>

                <div className="candidate-modal__footer">
                    <button type="button" className="button button--primary" onClick={onClose}>
                        Cerrar
                    </button>
                </div>
            </div>
        </dialog>
    )
}

export default CandidatoVerDetalle