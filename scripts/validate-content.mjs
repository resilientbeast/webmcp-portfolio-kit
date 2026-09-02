import { readFile } from 'node:fs/promises'

const loadJson = async (path) => JSON.parse(await readFile(new URL(path, import.meta.url), 'utf8'))
const [configPath = '../config/site.config.json', contentPath = '../content/profile.json'] = process.argv.slice(2)
const config = await loadJson(configPath)
const content = await loadJson(contentPath)
const errors = []

const requiredString = (value, label) => {
  if (typeof value !== 'string' || !value.trim()) errors.push(`${label} must be a non-empty string.`)
}

const requiredArray = (value, label) => {
  if (!Array.isArray(value) || value.length === 0) errors.push(`${label} must be a non-empty array.`)
}

requiredString(config.name, 'config.name')
requiredString(config.tagline, 'config.tagline')
requiredString(config.avatar, 'config.avatar')
requiredString(config.accentColor, 'config.accentColor')
requiredString(config.seo?.title, 'config.seo.title')
requiredString(config.seo?.description, 'config.seo.description')
for (const field of ['name', 'email', 'message']) requiredString(config.contactForm?.fields?.[field], `config.contactForm.fields.${field}`)

const profile = content.profile ?? {}
for (const field of ['role', 'availability', 'experience_years', 'summary']) requiredString(profile[field], `content.profile.${field}`)
requiredArray(profile.domains, 'content.profile.domains')
requiredArray(profile.metrics, 'content.profile.metrics')
requiredArray(profile.featured_skill_groups, 'content.profile.featured_skill_groups')
requiredArray(profile.service_cards, 'content.profile.service_cards')
requiredArray(profile.hero?.headline, 'content.profile.hero.headline')
requiredString(profile.hero?.specialisation, 'content.profile.hero.specialisation')

requiredArray(content.skills, 'content.skills')
requiredArray(content.projects, 'content.projects')
requiredArray(content.engagement_options, 'content.engagement_options')

const skillCategories = new Set(content.skills.map((skill) => skill.category))
for (const group of profile.featured_skill_groups ?? []) {
  requiredString(group.label, 'featured skill group label')
  if (!skillCategories.has(group.category)) errors.push(`Featured skill group "${group.label}" has no matching skills for category "${group.category}".`)
}

const projectIds = new Set()
for (const project of content.projects ?? []) {
  requiredString(project.id, 'project.id')
  requiredString(project.title, `project ${project.id || '(missing id)'} title`)
  requiredArray(project.tags, `project ${project.id || '(missing id)'} tags`)
  if (projectIds.has(project.id)) errors.push(`Duplicate project id: ${project.id}`)
  projectIds.add(project.id)
}

if (errors.length) {
  console.error('Content validation failed:\n- ' + errors.join('\n- '))
  process.exitCode = 1
} else {
  console.log(`Content validation passed: ${content.skills.length} skills, ${content.projects.length} projects, ${content.engagement_options.length} engagement options.`)
}
