import { useMemo, useState } from 'react'
import { buildProfileDraft, buildSiteConfig, normaliseAiDraft, parseProjects, parseSkills } from '../lib/profileDraft'
import './Setup.css'

const initialForm = { name: '', role: '', availability: 'Open to selected projects', experienceYears: '', summary: '', domains: '', sourceUrls: '', skills: '', projects: '', github: '', linkedin: '' }
const downloadJson = (filename, data) => {
    const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }))
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
    URL.revokeObjectURL(url)
}

function Setup() {
    const [form, setForm] = useState(initialForm)
    const [sourceText, setSourceText] = useState('')
    const [aiDraft, setAiDraft] = useState(null)
    const [notice, setNotice] = useState('Build a manual draft first, or use AI import only in a fork that has enabled it.')
    const [isDrafting, setIsDrafting] = useState(false)
    const input = useMemo(() => ({ ...form, domains: form.domains.split(',').map(value => value.trim()).filter(Boolean), sourceUrls: form.sourceUrls.split(/\s|,/).map(value => value.trim()).filter(Boolean), skills: parseSkills(form.skills), projects: parseProjects(form.projects) }), [form])
    const manualDraft = useMemo(() => buildProfileDraft(input), [input])
    const draft = aiDraft || manualDraft
    const update = event => setForm(current => ({ ...current, [event.target.name]: event.target.value }))

    const requestAiDraft = async () => {
        if (sourceText.trim().length < 80) return setNotice('Paste at least a short CV, profile export, or project description before requesting an AI draft.')
        setIsDrafting(true)
        setNotice('Creating a structured draft. It will remain review-only until you download it.')
        try {
            const response = await fetch('/api/profile-draft', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sourceText, identity: input }) })
            const payload = await response.json()
            if (!response.ok) throw new Error(payload.error || 'The AI draft is unavailable for this deployment.')
            setAiDraft(normaliseAiDraft(payload.candidate, input))
            setNotice('AI draft ready. Check every field and outcome before downloading.')
        } catch (error) {
            setNotice(error.message)
        } finally {
            setIsDrafting(false)
        }
    }

    return <div className="setup-page">
        <section className="setup-hero section"><div className="container"><div className="status-badge"><div className="status-dot animate"></div><span>Fork authoring tool</span></div><h1 className="page-title"><span className="text-primary">&gt;</span> Portfolio Bootstrapper</h1><p className="page-subtitle">Create reviewable, source-attributed starter content for a fork. Nothing is published or sent from this page.</p></div></section>
        <section className="setup-content section"><div className="container setup-grid"><form className="setup-form card" onSubmit={event => event.preventDefault()}><h2>1. Your public profile</h2><label>Full name<input name="name" value={form.name} onChange={update} placeholder="Jordan Lee" /></label><label>Role<input name="role" value={form.role} onChange={update} placeholder="Product design consultant" /></label><label>Availability<input name="availability" value={form.availability} onChange={update} /></label><label>Experience<input name="experienceYears" value={form.experienceYears} onChange={update} placeholder="8+ years" /></label><label>Short summary<textarea name="summary" value={form.summary} onChange={update} placeholder="Who you help, and the outcomes you focus on." /></label><label>Domains <span>comma separated</span><input name="domains" value={form.domains} onChange={update} placeholder="research, accessibility, design systems" /></label><label>Source URLs <span>citations only; never fetched</span><textarea name="sourceUrls" value={form.sourceUrls} onChange={update} placeholder="https://www.peopleperhour.com/..." /></label><label>Skills <span>one per line: Name | category | years</span><textarea name="skills" value={form.skills} onChange={update} placeholder={'User research | research | 8\nAccessibility | design | 6'} /></label><label>Case studies <span>one per line: Title | challenge | actions</span><textarea name="projects" value={form.projects} onChange={update} placeholder={'Design system | Inconsistent UI | Created tested components'} /></label><label>GitHub URL <input name="github" value={form.github} onChange={update} placeholder="https://github.com/your-name" /></label><label>LinkedIn URL <input name="linkedin" value={form.linkedin} onChange={update} placeholder="https://www.linkedin.com/in/your-name" /></label></form>
        <aside className="setup-review"><div className="setup-review-card card"><h2>2. Optional AI draft</h2><p>Paste text you own or are authorised to use—such as a CV, marketplace export, or project notes. URLs are recorded as citations, not scraped.</p><textarea value={sourceText} onChange={event => setSourceText(event.target.value)} maxLength="12000" placeholder="Paste source material here…" /><button className="btn btn-secondary" type="button" onClick={requestAiDraft} disabled={isDrafting}>{isDrafting ? 'Drafting…' : 'Draft with AI Gateway'}</button><p className="setup-notice" role="status">{notice}</p></div><div className="setup-review-card card"><h2>3. Review and export</h2><dl><div><dt>Skills</dt><dd>{draft.skills.length}</dd></div><div><dt>Case studies</dt><dd>{draft.projects.length}</dd></div><div><dt>Sources</dt><dd>{draft.profile.sources.length}</dd></div></dl><p>All case-study outcomes are labelled <code>self-reported</code> or <code>needs-review</code> until you replace them with your own evidence.</p><div className="setup-actions"><button className="btn btn-primary" type="button" onClick={() => downloadJson('profile.json', draft)}>Download profile.json</button><button className="btn btn-secondary" type="button" onClick={() => downloadJson('site.config.json', buildSiteConfig(input))}>Download site.config.json</button><button className="btn btn-secondary" type="button" onClick={() => { setAiDraft(null); setNotice('Using the deterministic manual draft.') }}>Use manual draft</button></div><details><summary>Preview generated profile.json</summary><pre>{JSON.stringify(draft, null, 2)}</pre></details></div></aside></div></section>
    </div>
}

export default Setup
