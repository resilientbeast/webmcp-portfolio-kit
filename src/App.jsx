import { useCallback, useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Contact from './pages/Contact'
import About from './pages/About'
import Stack from './pages/Stack'
import Setup from './pages/Setup'
import NotFound from './pages/NotFound'
import { usePortfolioWebMCP } from './hooks/usePortfolioWebMCP'
import config from '../config/site.config.json'

function App() {
    const navigate = useNavigate()
    const [activity, setActivity] = useState(null)
    const [skillFilter, setSkillFilter] = useState(null)
    const [fitMap, setFitMap] = useState(null)
    const [engagementOptions, setEngagementOptions] = useState(null)
    const [discoveryBrief, setDiscoveryBrief] = useState(null)
    const [contactDraft, setContactDraft] = useState(null)
    const onActivity = useCallback(event => setActivity(event), [])
    const onSkillFilter = useCallback(filter => setSkillFilter(filter), [])
    const onFitMap = useCallback(result => setFitMap(result), [])
    const onEngagementOptions = useCallback(options => setEngagementOptions(options), [])
    const onDiscoveryBrief = useCallback(brief => setDiscoveryBrief(brief), [])
    const onContactDraft = useCallback(draft => setContactDraft(draft), [])

    useEffect(() => {
        document.documentElement.style.setProperty('--color-primary', config.accentColor)
        document.title = config.seo.title
        document.querySelector('meta[name="description"]')?.setAttribute('content', config.seo.description)
    }, [])

    usePortfolioWebMCP({ navigate, onActivity, onSkillFilter, onFitMap, onEngagementOptions, onDiscoveryBrief, onContactDraft })

    return (
        <div className="app">
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/stack" element={<Stack agentFilter={skillFilter} />} />
                    <Route path="/setup" element={<Setup />} />
                    <Route path="/projects" element={<Projects fitMap={fitMap} engagementOptions={engagementOptions} discoveryBrief={discoveryBrief} />} />
                    <Route path="/projects/:slug" element={<ProjectDetail />} />
                    <Route path="/contact" element={<Contact draft={contactDraft} />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            {activity && <aside className="agent-activity" aria-live="polite"><span className="material-symbols-outlined">smart_toy</span><span><strong>Agent activity</strong><br />{activity.summary}</span><time>{activity.at}</time></aside>}
            <Footer />
        </div>
    )
}

export default App
