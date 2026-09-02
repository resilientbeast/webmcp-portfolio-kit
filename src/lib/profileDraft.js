const cleanText = (value, fallback = '') => typeof value === 'string' && value.trim() ? value.trim() : fallback
const cleanList = (value) => Array.isArray(value) ? value.map(item => cleanText(item)).filter(Boolean) : []
const safeUrl = (value) => {
    try { return new URL(value).href } catch { return '' }
}

export const parseSkills = (value) => String(value || '').split('\n').map((line, index) => {
    const [name, category = 'general', years = '1'] = line.split('|').map(part => part.trim())
    if (!name) return null
    const parsedYears = Math.max(1, Math.min(50, Number.parseInt(years, 10) || 1))
    return { category: cleanText(category, 'general').toLowerCase().replace(/[^a-z0-9]+/g, '_'), name, years: parsedYears, level: Math.min(100, 55 + parsedYears * 4), icon: '•', source: 'self-reported', order: index }
}).filter(Boolean)

export const parseProjects = (value) => String(value || '').split('\n').map((line, index) => {
    const [title, challenge = 'Add the problem this project solved.', actions = 'Add the actions you took.'] = line.split('|').map(part => part.trim())
    if (!title) return null
    return {
        id: `CASE-${String(index + 1).padStart(3, '0')}`,
        status: 'Completed',
        display_status: 'SELF-REPORTED',
        title,
        description: `${challenge} ${actions}`,
        tags: ['add-tags'],
        challenge,
        actions,
        stack: ['add-stack'],
        metrics: ['Add a verifiable outcome'],
        evidence_url: '',
        evidence: { source: 'self-reported', confidence: 'needs-review' },
    }
}).filter(Boolean)

const defaultSkills = [{ category: 'general', name: 'Add your first skill', years: 1, level: 70, icon: '•', source: 'self-reported' }]
const defaultProjects = [{ id: 'CASE-001', status: 'Completed', display_status: 'SELF-REPORTED', title: 'Add a representative project', description: 'Describe a real project after reviewing the generated draft.', tags: ['add-tags'], challenge: 'Add the client or technical challenge.', actions: 'Add the actions you took.', stack: ['add-stack'], metrics: ['Add a verifiable outcome'], evidence_url: '', evidence: { source: 'self-reported', confidence: 'needs-review' } }]

export const buildProfileDraft = (input = {}) => {
    const role = cleanText(input.role, 'Independent consultant')
    const availability = cleanText(input.availability, 'Open to selected projects')
    const experienceYears = cleanText(input.experienceYears, 'Add experience')
    const domains = cleanList(input.domains).length ? cleanList(input.domains) : ['add your primary domain']
    const skills = input.skills?.length ? input.skills : defaultSkills
    const projects = input.projects?.length ? input.projects : defaultProjects
    const categories = [...new Set(skills.map(skill => cleanText(skill.category, 'general')))]
    const sourceUrls = cleanList(input.sourceUrls).map(safeUrl).filter(Boolean)
    const sources = sourceUrls.map((url, index) => ({ label: index === 0 ? 'Author-provided source' : `Author-provided source ${index + 1}`, url, verified_on: new Date().toISOString().slice(0, 10) }))
    const summary = cleanText(input.summary, `${role} working across ${domains.join(', ')}.`)

    return {
        profile: {
            role,
            domains,
            availability,
            experience_years: experienceYears,
            summary,
            hero: { headline: [`Building practical`, `${role} outcomes`], specialisation: summary, visual_stats: [{ label: 'STATUS', value: availability.toUpperCase().slice(0, 16), tone: 'success' }, { label: 'EVIDENCE', value: 'REVIEWED', tone: 'primary' }] },
            metrics: [{ title: 'Experience', value: experienceYears, icon: 'check_circle', iconColor: 'success' }, { title: 'Availability', value: availability, icon: 'calendar_month', iconColor: 'primary' }, { title: 'Evidence', value: 'Review before publish', icon: 'fact_check', iconColor: 'purple' }],
            featured_skill_groups: categories.map(category => ({ label: category.replace(/_/g, ' '), category, limit: 4 })),
            service_cards: domains.slice(0, 4).map(domain => ({ icon: 'build', title: domain.replace(/\b\w/g, char => char.toUpperCase()), description: `Describe your ${domain} offer with your own words and evidence.` })),
            project_archive: { summary: 'Case studies supplied and reviewed by the portfolio owner.', active_command: 'ls ./in_progress/', completed_command: 'ls ./case_studies/' },
            about: { status: availability, title: 'About Me', lead: summary, paragraphs: ['Replace this starter copy with the professional story you want to publish.'], timeline: [], certifications: [], values: [{ icon: 'fact_check', title: 'Evidence first', description: 'Claims should be traceable to an author-provided source or clearly labelled self-reported.' }] },
            sources,
            marketplace_snapshot: { rating: '—', review_count: '—', projects_worked_on: projects.length, buyers: '—', disclaimer: 'This portfolio was created from author-provided material. Review every claim before publishing.' },
        },
        skills,
        projects,
        engagement_options: [{ type: 'consultation', description: `Discuss a scoped ${role.toLowerCase()} engagement.`, typical_duration: 'To be agreed' }],
    }
}

export const buildSiteConfig = (input = {}) => {
    const name = cleanText(input.name, 'Your Name')
    const role = cleanText(input.role, 'Independent consultant')
    return {
        name,
        tagline: role,
        seo: { title: `${name} | ${role}`, description: cleanText(input.summary, `${role} portfolio.`) },
        avatar: '/avatar.jpg',
        accentColor: '#0f766e',
        contactForm: { fields: { name: '#contact-name', email: '#contact-email', message: '#contact-message' } },
        social: { github: safeUrl(input.github), linkedin: safeUrl(input.linkedin), peopleperhour: safeUrl(input.sourceUrls?.[0]) },
    }
}

export const normaliseAiDraft = (candidate, identity = {}) => buildProfileDraft({
    ...identity,
    role: cleanText(candidate.role, identity.role),
    availability: cleanText(candidate.availability, identity.availability),
    experienceYears: cleanText(candidate.experienceYears, identity.experienceYears),
    summary: cleanText(candidate.summary, identity.summary),
    domains: cleanList(candidate.domains),
    skills: (candidate.skills || []).map(skill => ({ category: cleanText(skill.category, 'general').toLowerCase().replace(/[^a-z0-9]+/g, '_'), name: cleanText(skill.name, 'Unnamed skill'), years: Math.max(1, Math.min(50, Number(skill.years) || 1)), level: Math.max(1, Math.min(100, Number(skill.level) || 70)), icon: '•', source: 'author-provided' })),
    projects: (candidate.projects || []).map((project, index) => ({ id: `CASE-${String(index + 1).padStart(3, '0')}`, status: 'Completed', display_status: 'SELF-REPORTED', title: cleanText(project.title, `Case study ${index + 1}`), description: cleanText(project.description, project.challenge), tags: cleanList(project.tags).length ? cleanList(project.tags) : ['add-tags'], challenge: cleanText(project.challenge, 'Add the challenge.'), actions: cleanText(project.actions, 'Add the actions.'), stack: cleanList(project.stack).length ? cleanList(project.stack) : ['add-stack'], metrics: cleanList(project.metrics).length ? cleanList(project.metrics) : ['Add a verifiable outcome'], evidence_url: safeUrl(project.evidenceUrl), evidence: { source: 'author-provided', confidence: 'needs-review' } })),
    sourceUrls: identity.sourceUrls,
})
