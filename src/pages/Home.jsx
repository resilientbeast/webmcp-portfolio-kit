import { Link } from 'react-router-dom'
import { useState } from 'react'
import MetricCard from '../components/MetricCard'
import ProjectCard from '../components/ProjectCard'
import ProjectModal from '../components/ProjectModal'
import config from '../../config/site.config.json'
import profile from '../../content/profile.json'
import { projectCard } from '../lib/portfolio'
import './Home.css'

function Home() {
    // Modal state for project details
    const [selectedProject, setSelectedProject] = useState(null)

    const metrics = profile.profile.metrics

    const projects = profile.projects.filter(project => project.status === 'Completed').slice(0, 2).map(projectCard)

    const techStack = profile.profile.featured_skill_groups.map(group => ({
        ...group,
        skills: profile.skills
            .filter(skill => skill.category === group.category)
            .slice(0, group.limit)
            .map(skill => skill.name),
    }))

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero section">
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-text">
                            {/* Status Badge */}
                            <div className="status-badge">
                                <div className="status-dot animate"></div>
                                <span>{profile.profile.availability}</span>
                            </div>

                            {/* Name as Main Headline */}
                            <h1 className="hero-name">
                                <span className="text-primary">&gt;</span> {config.name}
                            </h1>

                            {/* Tagline as Subheader */}
                            <h2 className="hero-tagline">
                                {profile.profile.hero.headline.map((line, index) => (
                                    <span key={line}>{line}{index < profile.profile.hero.headline.length - 1 && <br />}</span>
                                ))}
                            </h2>

                            {/* Subtitle */}
                            <p className="hero-subtitle">
                                {config.tagline} // {profile.profile.experience_years} Years Experience<br />
                                {profile.profile.hero.specialisation}
                            </p>

                            {/* CTAs */}
                            <div className="hero-ctas">
                                <Link to="/contact" className="btn btn-primary">
                                    <span className="font-mono">Start_Collaboration()</span>
                                </Link>
                                {config.social.github && <a
                                    href={config.social.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-secondary"
                                >
                                    <span className="font-mono">view_source_code</span>
                                </a>}
                            </div>
                        </div>

                        {/* Profile Visual with Terminal Frame */}
                        <div className="hero-visual">
                            <div className="terminal-window profile-terminal">
                                <div className="terminal-header">
                                    <div className="terminal-dot red"></div>
                                    <div className="terminal-dot yellow"></div>
                                    <div className="terminal-dot green"></div>
                                    <span className="terminal-title">sys_monitor.exe</span>
                                </div>
                                <div className="terminal-content profile-content">
                                    {/* Profile Photo */}
                                    <img
                                        src={config.avatar}
                                        alt={config.name}
                                        className="profile-photo"
                                    />
                                    {/* Floating Stats */}
                                    {profile.profile.hero.visual_stats.map((stat, index) => (
                                        <div key={stat.label} className={`floating-stat ${index === 0 ? 'top-right' : 'bottom-left'}`}>
                                            <span className="stat-label">{stat.label}</span>
                                            <span className={`stat-value text-${stat.tone}`}>{stat.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Metrics Section */}
            <section className="metrics section">
                <div className="container">
                    <div className="grid-3">
                        {metrics.map((metric, index) => (
                            <MetricCard key={index} {...metric} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Stack Section */}
            <section className="tech-stack section">
                <div className="container">
                    <div className="section-header">
                        <span className="font-mono text-primary">cat ./stack_configuration.json</span>
                    </div>

                    <div className="tech-grid">
                        {/* JSON Code Block */}
                        <div className="code-block">
                            <div className="json-content">
                                <span className="text-dim">{'{'}</span>
                                {techStack.map((group, groupIndex) => (
                                    <div key={group.label} className="json-line">
                                        <span className="json-key">"{group.label}"</span>: [
                                        {group.skills.map((item, index) => (
                                            <span key={item} className="json-value">"{item}"{index < group.skills.length - 1 ? ', ' : ''}</span>
                                        ))}
                                        ]{groupIndex < techStack.length - 1 ? ',' : ''}
                                    </div>
                                ))}
                                <span className="text-dim">{'}'}</span>
                            </div>
                        </div>

                        {/* Skill Cards */}
                        <div className="skill-cards">
                            {profile.profile.service_cards.map(card => (
                                <div key={card.title} className="skill-card card">
                                    <div className="skill-header">
                                        <span className="material-symbols-outlined text-primary">{card.icon}</span>
                                        <h3>{card.title}</h3>
                                    </div>
                                    <p>{card.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section className="projects section">
                <div className="container">
                    <div className="section-header flex justify-between items-center">
                        <h2 className="font-mono text-primary">mount /volumes/case_studies</h2>
                        <Link to="/projects" className="view-all-link font-mono">
                            View All <span className="material-symbols-outlined">arrow_forward</span>
                        </Link>
                    </div>

                    <div className="projects-grid">
                        {projects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                {...project}
                                onClick={() => setSelectedProject(project)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Project Modal */}
            <ProjectModal
                project={selectedProject}
                isOpen={selectedProject !== null}
                onClose={() => setSelectedProject(null)}
            />

        </div>
    )
}

export default Home
