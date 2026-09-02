import './ProjectModal.css'

function ProjectModal({ project, isOpen, onClose }) {
    if (!isOpen || !project) return null

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className="modal-content card">
                {/* Terminal Header */}
                <div className="modal-header">
                    <div className="terminal-dots">
                        <span className="dot red" onClick={onClose}></span>
                        <span className="dot yellow"></span>
                        <span className="dot green"></span>
                    </div>
                    <span className="modal-title">cat ./projects/{project.id}/README.md</span>
                    <button className="modal-close" onClick={onClose}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Modal Body */}
                <div className="modal-body">
                    {/* Project Header */}
                    <div className="modal-project-header">
                        <span className="project-id">PROJECT_ID: {project.id}</span>
                        <span className="project-status success">STATUS: {project.status || 'Completed'}</span>
                    </div>

                    <h2 className="modal-project-title">{project.title}</h2>

                    {/* Tags */}
                    <div className="modal-tags">
                        {project.tags?.map((tag, index) => (
                            <span key={index} className="project-tag">#{tag}</span>
                        ))}
                    </div>

                    {/* Description */}
                    <div className="modal-section">
                        <h3 className="section-label">// Description</h3>
                        <p className="modal-description">{project.description}</p>
                    </div>

                    {/* Stats */}
                    {project.stats?.length > 0 && (
                        <div className="modal-section">
                            <h3 className="section-label">// Key Metrics</h3>
                            <div className="modal-stats">
                                {project.stats.map((stat, index) => (
                                    <div key={index} className="modal-stat-item">
                                        <span className="stat-value">{stat.value}</span>
                                        <span className="stat-label">{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {project.evidence && <div className="modal-section">
                        <h3 className="section-label">// Evidence Notes</h3>
                        <div className="modal-approach"><div className="approach-item"><span className="approach-icon material-symbols-outlined">fact_check</span><div className="approach-content"><strong>{project.evidence.confidence} evidence</strong><p>{project.evidence.summary}</p><p>Source: {project.evidence.source}</p></div></div></div>
                    </div>}
                </div>

                {/* Modal Footer */}
                <div className="modal-footer">
                    <button className="modal-btn secondary" onClick={onClose}>
                        close()
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProjectModal
