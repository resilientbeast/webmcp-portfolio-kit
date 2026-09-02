export const categoriesFor = skills => [
    { id: 'all', label: 'All', icon: 'apps' },
    ...[...new Set(skills.map(skill => skill.category))].map(category => ({ id: category, label: category.replace(/(^|_)([a-z])/g, (_, __, letter) => ` ${letter.toUpperCase()}`).trim(), icon: 'category' }))
]

export const projectDescription = project => project.description || project.challenge || ''

export const projectStats = project => project.stats || (project.metrics || []).slice(0, 3).map((value, index) => ({ label: ['Evidence', 'Outcome', 'Context'][index], value, color: index === 0 ? 'success' : '' }))

export const projectCard = project => ({ ...project, status: project.display_status || project.status, description: projectDescription(project), stats: projectStats(project) })
