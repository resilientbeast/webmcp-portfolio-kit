import { Link } from 'react-router-dom'
import './ProjectCard.css'

function ProjectCard({
    id,
    title,
    description,
    tags = [],
    stats = [],
    status = 'DEPLOYED',
    slug = null,
    onClick = null
}) {
    const handleClick = (e) => {
        if (onClick) {
            e.preventDefault()
            onClick()
        }
    }

    // Determine if this is an in-progress project (has slug) or completed (uses modal)
    const isInProgress = slug !== null
    const linkDestination = isInProgress ? `/projects/${slug}` : '#'

    return (
        <div className="project-card card">
            <div className="project-content">
                {/* Background Icon */}
                <div className="project-bg-icon">
                    <span className="material-symbols-outlined">code_blocks</span>
                </div>

                {/* Header */}
                <div className="project-header">
                    <span className="project-id">PROJECT_ID: {id}</span>
                    <span className={`project-status ${status === 'In Progress' ? 'in-progress' : ''}`}>
                        STATUS: {status}
                    </span>
                </div>

                {/* Title & Description */}
                <h3 className="project-title">{title}</h3>
                <p className="project-description">{description}</p>

                {/* Stats */}
                {stats.length > 0 && (
                    <div className="project-stats">
                        {stats.map((stat, index) => (
                            <div key={index} className="stat-item">
                                <p className="stat-label">{stat.label}</p>
                                <p className={`stat-value ${stat.color || ''}`}>{stat.value}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Footer */}
                <div className="project-footer">
                    <div className="project-tags">
                        {tags.map((tag, index) => (
                            <span key={index} className="project-tag">#{tag}</span>
                        ))}
                    </div>
                    <Link
                        to={linkDestination}
                        className="project-link"
                        onClick={handleClick}
                    >
                        view_logs() <span className="material-symbols-outlined">arrow_forward</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard
