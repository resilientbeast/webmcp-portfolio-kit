import { Link } from 'react-router-dom'
import config from '../../config/site.config.json'
import './Footer.css'

function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    {/* Git Info */}
                    <div className="footer-git">
                        <span className="material-symbols-outlined">call_split</span>
                        <span>main</span>
                        <span className="footer-dot"></span>
                        <span>commit: 8a2f9c1</span>
                    </div>

                    {/* Social Links */}
                    <div className="footer-links">
                        <a
                            href={config.social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-link"
                        >
                            GitHub
                        </a>
                        {config.social.linkedin && <a
                            href={config.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-link"
                        >
                            LinkedIn
                        </a>}
                        <Link to="/contact" className="footer-link">
                            Email
                        </Link>
                    </div>

                    {/* Copyright */}
                    <div className="footer-copyright">
                        © {currentYear} {config.name.toUpperCase()}. WEBMCP PORTFOLIO KIT.
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
