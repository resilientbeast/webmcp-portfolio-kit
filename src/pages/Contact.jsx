import { useEffect, useState } from 'react'
import config from '../../config/site.config.json'
import ContactForm from '../components/ContactForm'
import './Contact.css'

const emptyDraft = { name: '', email: '', type: 'consultation', message: '' }

function Contact({ draft }) {
    const [formData, setFormData] = useState(emptyDraft)
    const [reviewed, setReviewed] = useState(false)
    useEffect(() => { if (draft) { setFormData(previous => ({ ...previous, ...draft })); setReviewed(false) } }, [draft])
    const handleChange = event => setFormData(previous => ({ ...previous, [event.target.name]: event.target.value }))
    const handleSubmit = event => { event.preventDefault(); setReviewed(true) }

    return <div className="contact-page">
        <section className="contact-status"><div className="container"><div className="status-bar"><div className="status-item"><span className="status-label">Form Status</span><span className="status-value success">REVIEW_ONLY</span></div><div className="status-item"><span className="status-label">Transport</span><span className="status-value">Not configured</span></div><div className="status-item"><span className="status-label">WebMCP</span><span className="status-value success">CAN_FILL</span></div></div></div></section>
        <section className="contact-main section"><div className="container"><div className="terminal-window contact-terminal"><div className="terminal-header"><div className="terminal-dot red"></div><div className="terminal-dot yellow"></div><div className="terminal-dot green"></div><span className="terminal-title">visitor@portfolio : ~/contact</span></div><div className="terminal-content"><div className="terminal-output"><p className="text-warning">CONTACT DRAFT INTERFACE</p><p className="text-dim">The default starter-kit form never sends data. A visitor can review a WebMCP-prepared draft, then copy it into their preferred contact channel.</p></div>{reviewed ? <div className="success-message"><p className="text-success">✓ Draft reviewed — nothing was sent.</p><p className="text-dim">Forkers can connect their own form provider without changing the WebMCP contract.</p></div> : <ContactForm value={formData} onChange={handleChange} onReview={handleSubmit} />}</div><div className="terminal-footer"><span>NO_BACKEND</span><span>NO_SECRETS</span><span className="footer-right">{config.name}</span></div></div></div></section>
    </div>
}

export default Contact
