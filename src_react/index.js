import React , { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'

// hand-made components
import App1 from './components/App1'
import getCookie from './controller/cookie'

import './css/style3.css'


// checks the urrl's path user is trying to access, and gives him the 
// appropriate files if certain conditions are met.

const checkPath = ()=> {
    switch(window.location.pathname){
        case '/':
            render(App1)
            break
        case '/signin':
            window.location.assign('/')
            break
        case '/signup':
            window.location.assign('/')
            break
        case '/setup':
            validSession(window.location.pathname,(val)=> {
                console.log(val)
                if(val.authenticated){
                    console.log('authed!')
                    if(getCookie.getCookie('first') != 'null' && val.first){
                        // lazyLoad setup when it's necessary!
                        renderLazy("Setup1.js")
                    }
                    else {
                        window.location.assign('/dashboard')              
                    }
                }
                else {
                    window.location.replace('/')
                    console.log('not authed!')
                }
            })

            break
            case '/dashboard':
                validSession(window.location.pathname,(val)=> {
                    if(val){
                        console.log('authed!')
                    }
                    else {
                        window.location.replace('/')
                        console.log('not authed!')
                    }
                })
    }
}


const validSession = async (path, callback)=> {
    console.log(`http://localhost:3000${path}`)
    await fetch(`http://localhost:3000${path}`, {
        method: 'GET',
        mode: 'cors',
        withCredentials: true,
        credentials: 'include',
        headers: {
            'Content-type': 'application/json'
        }
    }).then((res)=> {
        return res.json()
    }).then((data)=> {
        if(data){
            callback(data)
        }
        else {
            callback(false)
        }
    }).catch((e)=> {
        callback(false)
    // debugging purposes, remove once maintained        
    })
}

const render = (Component)=> {
    ReactDOM.render(
        <Component />
        , document.getElementById('root'))
}

const renderLazy = (component)=> {
    // import(test): test could be anything so it fails when loading with webppack
    // import("path"): loads coorectly-
    // import("./" + "path" + ".js") works truly dynamic
    const Component = lazy(()=> import("./components/view/" + component))
    ReactDOM.render(
        <Suspense fallback={<div id="loading">Loading</div>}>
            <Component />
        </Suspense>
    ,document.getElementById('root'))
}
checkPath()