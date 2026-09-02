import config from '../../config/site.config.json'
import profile from '../../content/profile.json'
import './About.css'

function About() {
    const snapshot = profile.profile.marketplace_snapshot
    return <div className="about-page">
        <section className="about-hero section"><div className="container"><div className="status-badge"><div className="status-dot animate"></div><span>{profile.profile.availability}</span></div><h1 className="page-title"><span className="text-primary">&gt;</span> About</h1><div className="about-intro"><div className="intro-content"><p className="intro-lead"><strong>{config.name}</strong> — {config.tagline}</p><p className="intro-text">{profile.profile.summary}</p><p className="intro-text">This reference deployment is powered by the same generic WebMCP tools and JSON contract included in every fork of the kit.</p></div><div className="intro-stats"><div className="stat-box"><span className="stat-number">{profile.profile.experience_years}</span><span className="stat-label">Years Experience</span></div><div className="stat-box"><span className="stat-number">{snapshot.projects_worked_on}+</span><span className="stat-label">Projects Worked On</span></div><div className="stat-box"><span className="stat-number">{snapshot.rating}</span><span className="stat-label">Public Rating</span></div><div className="stat-box"><span className="stat-number">{snapshot.review_count}</span><span className="stat-label">Public Reviews</span></div></div></div></div></section>
        <section className="values-section section"><div className="container"><div className="section-header"><span className="font-mono text-primary">cat ./sources.json</span></div><div className="values-grid">{profile.profile.sources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" className="value-card card"><span className="material-symbols-outlined">source</span><h3>{source.label}</h3><p>Verified {source.verified_on}</p></a>)}</div></div></section>
    </div>
}

export default About
