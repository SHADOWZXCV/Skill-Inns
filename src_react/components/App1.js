import React from 'react'
import { useSpring, animated } from 'react-spring'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

// styles
import '../css/styles.css'
import '../css/styles2.css'

// hand-made components
import Nav from './Nav'
import Content from './Content'
import Footer from './Footer'
import Signin from './Signin'
import Signup from './signup/Step1'

const App1 = () => {
    const props = useSpring({opacity: 1, from: {opacity: 0}, delay: 400, config: { duration: 1000}})

    return (
        <>
            <Router>
                <Switch>
                <Route exact path="/signup">
                    <Signup />
                </Route>
                <Route path="/">
                    <div className="container-main">
                    <Route path="/signin"><Signin /></Route>
                        <Nav signin={true} />
                        <animated.div style={props} className="animated-content"><Content /></animated.div>
                        <Footer />
                    </div>
                </Route>
                <Route></Route>
                </Switch>
            </Router>
        </>
    )
}

export default App1
