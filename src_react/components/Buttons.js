import React from 'react'
import { useSpring, animated } from 'react-spring'
import { Link } from 'react-router-dom'

const Buttons = () => {
    const props = useSpring({opacity: 1, from: {opacity: 0}, delay: 1400, config: { duration: 500}})
    const props2 = useSpring({opacity: 1, from: {opacity: 0}, delay: 2400, config: { duration: 500}})
    return (
        <div className="buttons-container">
         <animated.div style={props} className="animated-features">
             <Link to="/features" className="features-btn">Features</Link>
         </animated.div>
         <animated.div style={props2} className="animated-create"><Link to="/signup" className="create-btn">Create an Account</Link></animated.div>
        </div>
    )
}

export default Buttons
