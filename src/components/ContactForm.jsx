function ContactForm({ value, onChange, onReview }) {
    return <form onSubmit={onReview} className="contact-form">
        <div className="code-comment">// Contact Request Draft</div>
        <div className="form-code"><div className="form-fields"><div className="form-line"><span className="property">sender:</span><input id="contact-name" type="text" name="name" value={value.name} onChange={onChange} placeholder='"Your Name"' className="form-input" required /></div><div className="form-line"><span className="property">email:</span><input id="contact-email" type="email" name="email" value={value.email} onChange={onChange} placeholder='"contact@company.com"' className="form-input" required /></div><div className="form-line"><span className="property">type:</span><select name="type" value={value.type} onChange={onChange} className="form-select"><option value="consultation">"Consultation"</option><option value="project">"Project Inquiry"</option><option value="support">"Technical Support"</option></select></div></div><div className="message-section"><span className="keyword">return</span><textarea id="contact-message" name="message" value={value.message} onChange={onChange} placeholder="// Describe your project..." className="form-textarea" rows="4" required /></div></div>
        <div className="form-submit"><span className="prompt">→ ~ </span><button type="submit" className="submit-btn">review_draft()</button></div>
    </form>
}

export default ContactForm
