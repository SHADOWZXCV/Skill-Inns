import React from 'react'
import { BrowserRouter as Router,
         Route,
         Link
} from 'react-router-dom'

// hand-made components
import Logo from './Logo'

const Nav = ({ signin }) => {
    return (
        <div className="nav-bar">
            <Logo />
            { signin && <Link to="/signin">Sign in</Link> }
        </div>
    )
}

export default Nav
