import { readFile } from 'node:fs/promises'
import { findProjects, findSkills, mapToEvidence } from '../src/lib/matching.js'

const fixture = JSON.parse(await readFile(new URL('../fixtures/alternate-profile.json', import.meta.url), 'utf8'))
const skills = findSkills(fixture.skills, 'accessibility')
const projects = findProjects(fixture.projects, 'accessible patterns')
const evidence = mapToEvidence(fixture, ['accessibility', 'design systems', 'infrastructure'])

if (!skills.length || !projects.length) throw new Error('Alternate fixture did not produce expected skill and project matches.')
if (evidence[0].fit !== 'evidence found' || evidence[1].fit !== 'evidence found' || evidence[2].fit !== 'no direct evidence found') {
  throw new Error('Alternate fixture did not produce the expected evidence map.')
}

console.log(`Forkability smoke passed for ${fixture.profile.role}: ${skills.length} skill match(es), ${projects.length} project match(es), and an explicit unmatched requirement.`)
