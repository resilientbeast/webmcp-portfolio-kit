import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import config from '../../config/site.config.json'
import './Header.css'

function Header() {
    const location = useLocation()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const navLinks = [
        { path: '/', label: './home' },
        { path: '/about', label: './about' },
        { path: '/stack', label: './stack' },
        { path: '/projects', label: './projects' },
        { path: '/setup', label: './setup' },
        { path: '/contact', label: './contact' },
    ]

    const isActive = (path) => location.pathname === path

    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    {/* Logo / Breadcrumb */}
                    <Link to="/" className="header-logo">
                        <span className="material-symbols-outlined">terminal</span>
                        <h1 className="header-title">~/{config.name.toLowerCase().replace(/\s+/g, '-')}/portfolio</h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="header-nav">
                        {navLinks.map(link => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA Button */}
                    <Link to="/contact" className="header-cta">
                        <span>Hire_Me()</span>
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className="material-symbols-outlined">
                            {mobileMenuOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <nav className="mobile-nav">
                        {navLinks.map(link => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            to="/contact"
                            className="mobile-cta"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Hire_Me()
                        </Link>
                    </nav>
                )}
            </div>
        </header>
    )
}

export default Header
