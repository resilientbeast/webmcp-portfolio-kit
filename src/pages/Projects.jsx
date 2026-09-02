import { useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import ProjectModal from '../components/ProjectModal'
import profile from '../../content/profile.json'
import { projectCard } from '../lib/portfolio'
import './Projects.css'

function Projects({ fitMap }) {
    const [selectedProject, setSelectedProject] = useState(null)
    const activeProjects = profile.projects.filter(project => project.status !== 'Completed')
    const completedProjects = profile.projects.filter(project => project.status === 'Completed')

    return (
        <div className="projects-page">
            <section className="projects-hero section">
                <div className="container">
                    <div className="status-badge"><div className="status-dot animate"></div><span>{activeProjects.length} Active • {completedProjects.length} Completed</span></div>
                    <h1 className="page-title"><span className="text-primary">&gt;</span> Project Archive</h1>
                    <p className="page-subtitle">Work represented as evidence-led portfolio entries.<br />Outcome metrics are explicitly marked as self-reported in the agent-readable data model.</p>
                </div>
            </section>

            <section className="projects-list section"><div className="container"><div className="section-header"><span className="font-mono text-primary">watch -n1 ./active_work/</span><span className="font-mono text-dim">Active: {activeProjects.length} projects</span></div><div className="projects-grid">{activeProjects.map(project => <ProjectCard key={project.id} {...projectCard(project)} />)}</div></div></section>
            {fitMap && <section className="fit-analysis section"><div className="container"><div className="section-header"><span className="font-mono text-primary">./map_requirements_to_evidence</span><span className="font-mono text-dim">Agent-assisted, source-labelled</span></div><div className="fit-analysis-card card">{fitMap.mapping.map(item => <div key={item.requirement} className="fit-row"><strong>{item.requirement}</strong><span className={item.fit === 'evidence found' ? 'fit-found' : 'fit-missing'}>{item.fit}</span><p>{[...item.skills.map(skill => `${skill.name} (${skill.years}y)`), ...item.projects.map(project => `${project.title} [${project.evidence.confidence}]`)].join(' · ') || 'No direct skill or portfolio evidence was found.'}</p></div>)}<p className="fit-disclaimer">Evidence map only — it does not guarantee suitability, capacity, or a project outcome.</p></div></div></section>}
            {engagementOptions && <section className="fit-analysis section"><div className="container"><div className="section-header"><span className="font-mono text-primary">./compare_engagement_options</span></div><div className="fit-analysis-card card">{engagementOptions.map(option => <div key={option.type} className="fit-row"><strong>{option.type.replace('_', ' ')}</strong><span className="fit-found">{option.typical_duration}</span><p>{option.description}</p></div>)}</div></div></section>}
            {discoveryBrief && <section className="fit-analysis section"><div className="container"><div className="section-header"><span className="font-mono text-primary">./discovery_brief</span><span className="font-mono text-dim">Reviewable — not sent</span></div><div className="fit-analysis-card card"><div className="fit-row"><strong>Goals</strong><p>{discoveryBrief.goals.join(' · ')}</p></div>{discoveryBrief.constraints?.length > 0 && <div className="fit-row"><strong>Constraints</strong><p>{discoveryBrief.constraints.join(' · ')}</p></div>}{discoveryBrief.questions?.length > 0 && <div className="fit-row"><strong>Questions</strong><p>{discoveryBrief.questions.join(' · ')}</p></div>}</div></div></section>}
            <section className="projects-list section"><div className="container"><div className="section-header"><span className="font-mono text-primary">ls -la ./case_studies/</span><span className="font-mono text-dim">Found: {completedProjects.length} entries</span></div><div className="projects-grid">{completedProjects.map(project => <ProjectCard key={project.id} {...projectCard(project)} onClick={() => setSelectedProject(projectCard(project))} />)}</div></div></section>
            <ProjectModal project={selectedProject} isOpen={selectedProject !== null} onClose={() => setSelectedProject(null)} />
        </div>
    )
}

export default Projects
