import { useEffect, useState } from 'react'
import profile from '../../content/profile.json'
import { categoriesFor } from '../lib/portfolio'
import './Stack.css'

function Stack({ agentFilter }) {
    const [activeCategory, setActiveCategory] = useState('all')

    useEffect(() => {
        if (agentFilter?.category) setActiveCategory(agentFilter.category)
    }, [agentFilter])

    const filteredSkills = profile.skills.filter(skill => {
        const categoryMatches = activeCategory === 'all' || skill.category === activeCategory
        const query = agentFilter?.query?.trim().toLowerCase()
        const queryMatches = !query || `${skill.name} ${skill.category}`.toLowerCase().includes(query)
        const yearsMatch = !agentFilter?.minYears || skill.years >= agentFilter.minYears
        return categoryMatches && queryMatches && yearsMatch
    })

    const getSkillLevel = level => level >= 90 ? 'Expert' : level >= 75 ? 'Advanced' : level >= 60 ? 'Intermediate' : 'Beginner'

    return (
        <div className="stack-page">
            <section className="stack-hero section"><div className="container"><div className="status-badge"><div className="status-dot animate"></div><span>{profile.skills.length} Technologies Represented</span></div><h1 className="page-title"><span className="text-primary">&gt;</span> Tech Stack</h1><p className="page-subtitle">Interactive view of tools, platforms, and technologies. An agent can apply the same filters through the site’s WebMCP tools.</p></div></section>
            <section className="filters-section"><div className="container"><div className="filter-tabs">{categoriesFor(profile.skills).map(category => <button key={category.id} className={`filter-tab ${activeCategory === category.id ? 'active' : ''}`} onClick={() => setActiveCategory(category.id)}><span className="material-symbols-outlined">{category.icon}</span>{category.label}</button>)}</div></div></section>
            <section className="skills-section section"><div className="container"><div className="section-header"><span className="font-mono text-primary">{activeCategory === 'all' ? 'cat ./tech_stack.json | jq .' : `cat ./tech_stack.json | jq '.${activeCategory}'`}</span><span className="font-mono text-dim">Found: {filteredSkills.length} entries</span></div><div className="skills-grid">{filteredSkills.map(skill => <div key={skill.name} className="skill-item card"><div className="skill-header"><span className="skill-icon">{skill.icon}</span><div className="skill-meta"><h3 className="skill-name">{skill.name}</h3><span className="skill-level-tag">{getSkillLevel(skill.level)}</span></div></div><div className="skill-bar-container"><div className="skill-bar" style={{ width: `${skill.level}%` }}><span className="skill-percentage">{skill.level}%</span></div></div><div className="skill-footer"><span className="skill-years"><span className="material-symbols-outlined">schedule</span>{skill.years} years</span><span className="skill-category">#{skill.category}</span></div></div>)}</div></div></section>
            <section className="matrix-section section"><div className="container"><div className="section-header"><span className="font-mono text-primary">./analyze_expertise --matrix</span></div><div className="matrix-grid"><div className="matrix-card card"><div className="matrix-header"><span className="material-symbols-outlined">architecture</span><h3>System Design</h3></div><div className="matrix-skills"><span>High Availability</span><span>Load Balancing</span><span>Auto-Scaling</span><span>Disaster Recovery</span></div></div><div className="matrix-card card"><div className="matrix-header"><span className="material-symbols-outlined">security</span><h3>Security</h3></div><div className="matrix-skills"><span>SSL/TLS</span><span>Firewall Config</span><span>IAM Policies</span><span>GDPR Compliance</span></div></div><div className="matrix-card card"><div className="matrix-header"><span className="material-symbols-outlined">rocket_launch</span><h3>DevOps</h3></div><div className="matrix-skills"><span>CI/CD Pipelines</span><span>GitOps</span><span>Blue-Green Deploy</span><span>Canary Releases</span></div></div><div className="matrix-card card"><div className="matrix-header"><span className="material-symbols-outlined">tune</span><h3>Performance</h3></div><div className="matrix-skills"><span>Caching Strategies</span><span>CDN Configuration</span><span>Query Optimization</span><span>Profiling</span></div></div></div></div></section>
        </div>
    )
}

export default Stack
