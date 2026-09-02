import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { createInterface } from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { buildProfileDraft, parseProjects, parseSkills } from '../src/lib/profileDraft.js'

const destination = resolve(process.argv[2] || 'content/profile.generated.json')
const prompt = createInterface({ input, output })
const ask = (question, fallback = '') => prompt.question(`${question}${fallback ? ` [${fallback}]` : ''}: `).then(answer => answer.trim() || fallback)

try {
    const role = await ask('Role', 'Independent consultant')
    const experienceYears = await ask('Experience', 'Add experience')
    const domains = (await ask('Domains, comma separated', 'your primary domain')).split(',').map(value => value.trim()).filter(Boolean)
    const summary = await ask('One-sentence summary', `Independent ${role.toLowerCase()}.`)
    const sourceUrls = (await ask('Optional public profile URL', '')).split(',').map(value => value.trim()).filter(Boolean)
    const skills = parseSkills(await ask('Skills, one per line as Name | category | years', 'Add your first skill | general | 1'))
    const projects = parseProjects(await ask('Projects, one per line as Title | challenge | actions', 'Add a representative project | Add the challenge | Add the actions'))
    await mkdir(dirname(destination), { recursive: true })
    await writeFile(destination, `${JSON.stringify(buildProfileDraft({ role, experienceYears, domains, summary, sourceUrls, skills, projects }), null, 2)}\n`)
    console.log(`Wrote ${destination}. Run npm run validate-content -- config/site.config.json ${destination} before replacing content/profile.json.`)
} finally {
    prompt.close()
}
