import { useParams, Link } from 'react-router-dom'
import profile from '../../content/profile.json'
import { projectCard } from '../lib/portfolio'
import './ProjectDetail.css'

function ProjectDetail() {
    const { slug } = useParams()
    const project = profile.projects.find(item => item.slug === slug)
    if (!project) return <div className="project-detail-page"><div className="container"><div className="not-found"><h1>404: Project Not Found</h1><Link to="/projects" className="back-link">← Back to Projects</Link></div></div></div>
    const card = projectCard(project)
    return <div className="project-detail-page">
        <section className="project-hero section"><div className="container"><Link to="/projects" className="back-link"><span className="material-symbols-outlined">arrow_back</span>cd ../projects</Link><div className="project-header"><div className="project-meta"><span className="project-id">PROJECT_ID: {project.id}</span><span className="project-status primary">STATUS: {card.status}</span></div><h1 className="project-title">{project.title}</h1><p className="project-description">{card.description}</p><div className="project-tags">{project.tags.map(tag => <span key={tag} className="tag">#{tag}</span>)}</div></div></div></section>
        <section className="project-stats-section section"><div className="container"><div className="stats-grid">{card.stats.map(stat => <div key={stat.label} className="stat-card card"><span className="stat-value">{stat.value}</span><span className="stat-label">{stat.label}</span></div>)}</div></div></section>
        <section className="project-about section"><div className="container"><div className="section-header"><span className="font-mono text-primary">cat ./evidence.md</span></div><div className="about-content card"><p><strong>Challenge:</strong> {project.challenge}</p><p><strong>Actions:</strong> {project.actions}</p><p><strong>Evidence:</strong> {project.evidence.confidence} / {project.evidence.source}</p>{project.evidence_url && <p><a href={project.evidence_url} target="_blank" rel="noopener noreferrer">View source</a></p>}</div></div></section>
        <section className="project-tech section"><div className="container"><div className="section-header"><span className="font-mono text-primary">cat ./stack.json</span></div><div className="tech-grid">{project.stack.map(tech => <div key={tech} className="tech-item card"><span className="tech-name">{tech}</span></div>)}</div></div></section>
    </div>
}

export default ProjectDetail
