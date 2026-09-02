import './MetricCard.css'

function MetricCard({ title, value, icon, iconColor = 'primary', suffix = '' }) {
    const colorClass = `icon-${iconColor}`

    return (
        <div className="metric-card card">
            <div className="metric-header">
                <p className="metric-title">{title}</p>
                <span className={`material-symbols-outlined ${colorClass}`}>{icon}</span>
            </div>
            <p className="metric-value">
                {value}
                {suffix && <span className="metric-suffix">{suffix}</span>}
            </p>
        </div>
    )
}

export default MetricCard
