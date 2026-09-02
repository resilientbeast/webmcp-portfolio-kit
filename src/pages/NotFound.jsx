import { Link } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
    return (
        <div className="not-found-page">
            <div className="container">
                <div className="error-content">
                    {/* Terminal Window */}
                    <div className="terminal-window">
                        <div className="terminal-header">
                            <div className="terminal-dot red"></div>
                            <div className="terminal-dot yellow"></div>
                            <div className="terminal-dot green"></div>
                            <span className="terminal-title">bash: error</span>
                        </div>
                        <div className="terminal-body">
                            <div className="error-output">
                                <span className="prompt">$ </span>
                                <span className="command">cd {window.location.pathname}</span>
                            </div>
                            <div className="error-message">
                                <span className="error-text">bash: cd: {window.location.pathname}: No such file or directory</span>
                            </div>
                            <div className="error-code">
                                <span className="code-label">EXIT_CODE:</span>
                                <span className="code-value">404</span>
                            </div>
                        </div>
                    </div>

                    {/* Error Details */}
                    <div className="error-details">
                        <h1 className="error-title">
                            <span className="text-primary">&gt;</span> Page Not Found
                        </h1>
                        <p className="error-description">
                            The requested resource could not be located on this server.
                            Please check the URL or navigate back to safety.
                        </p>

                        {/* Action Buttons */}
                        <div className="error-actions">
                            <Link to="/" className="btn btn-primary">
                                <span className="material-symbols-outlined">home</span>
                                cd ~/home
                            </Link>
                            <Link to="/projects" className="btn btn-secondary">
                                <span className="material-symbols-outlined">folder</span>
                                ls ./projects
                            </Link>
                            <Link to="/contact" className="btn btn-secondary">
                                <span className="material-symbols-outlined">mail</span>
                                ./contact.sh
                            </Link>
                        </div>
                    </div>

                    {/* Fun ASCII Art */}
                    <div className="ascii-art">
                        <pre>{`
    _____ _____ _____
   |  |  |     |  |  |
   |__   |  |  |__   |
      |__|_____|__|__|
                        `}</pre>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound
