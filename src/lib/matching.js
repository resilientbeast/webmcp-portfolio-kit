const normalise = value => value.toLowerCase().replace(/[^a-z0-9+#.\s/-]/g, ' ').replace(/\s+/g, ' ').trim()

const words = value => normalise(value).split(' ').filter(word => word.length > 1)

export function scoreText(query, values) {
    const terms = words(query)
    if (!terms.length) return 0
    const haystack = normalise(values.filter(Boolean).join(' '))
    return terms.reduce((score, term) => score + (haystack.includes(term) ? 1 : 0), 0) / terms.length
}

export function findSkills(skills, query, { category = 'all', minYears = 0 } = {}) {
    return skills
        .filter(skill => (category === 'all' || skill.category === category) && skill.years >= minYears)
        .map(skill => ({ ...skill, score: scoreText(query || skill.name, [skill.name, skill.category]) }))
        .filter(skill => !query || skill.score > 0)
        .sort((a, b) => b.score - a.score || b.years - a.years)
}

export function findProjects(projects, query, { includeActive = true } = {}) {
    return projects
        .filter(project => includeActive || project.status === 'Completed')
        .map(project => ({ ...project, score: scoreText(query || project.title, [project.title, project.challenge, project.actions, ...(project.tags || []), ...(project.stack || [])]) }))
        .filter(project => !query || project.score > 0)
        .sort((a, b) => b.score - a.score)
}

export function mapToEvidence(profile, requirements, options = {}) {
    return requirements.map(requirement => {
        const skills = findSkills(profile.skills, requirement, options).slice(0, 3)
        const projects = findProjects(profile.projects, requirement, options).slice(0, 3)
        return {
            requirement,
            fit: skills.length || projects.length ? 'evidence found' : 'no direct evidence found',
            skills: skills.map(({ name, years, source }) => ({ name, years, source })),
            projects: projects.map(({ id, title, evidence }) => ({ id, title, evidence }))
        }
    })
}
