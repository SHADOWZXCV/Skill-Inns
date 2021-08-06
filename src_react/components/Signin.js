import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { FaTimes } from "react-icons/fa"

// animation
import { useSpring, animated } from 'react-spring'
import LoadingBar from 'react-top-loading-bar'

// form library
import { useForm } from 'react-hook-form'
import getCookie from '../controller/cookie'

const catchErr = (e)=> {
    e.style.borderColor = "#D9353A"
    document.getElementsByClassName('signin-block')[0].style.paddingBottom = "100px"
}


const Signin = () => {
    const history = useHistory()
    const [nameUser, setNameUser]  = useState('')
    const props = useSpring({top: 0, opacity: 1, from: {top: -50, opacity: 0}, config: { duration: 200}})
    // establish hook form
    const { register, handleSubmit, formState: {errors} } = useForm()
    
    const [wrongP, setWrongP] = useState(false)
    const [invalidEmail, setInvalidEmail] = useState(false)
    const [authenticated, setAuthenticated] = useState(false)

    const [stateBar, setStateBar] = useState(0)
    // increment bar value, loading bar!
    const increment = (progress) => {
        document.querySelector('.above-all').style.setProperty('display', 'flex')
        for (let index = 0; index <= progress; index++) {
            setStateBar(index)
            if(index == 100){
                setStateBar(0)
                document.querySelector('.above-all').style.setProperty('display', 'none')
            }
        }
    }

    const onSubmit = async data => {
        increment(40)
            await fetch('http://localhost:3000/signin',{
            method: 'POST',
            mode: 'cors',
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((res)=> {
            if(res.status == 401){
                increment(100)
                setWrongP(true)
                setInvalidEmail(false)
                return
            }
            else if(res.status == 404){
                increment(100)
                setInvalidEmail(true)
                setWrongP(false)
                return
            }
            else if (res.status == 200){
                setInvalidEmail(false)
                setWrongP(false)
            }
            return res.json()

        }).then((data)=> {
            increment(100)
            setNameUser(data['name'])
            setAuthenticated(true)
            console.log(data)
            if(getCookie.getCookie('first')){
                setTimeout(()=> {
                    window.location.assign('/setup')
                }, 1000)
            }
            else {
                setTimeout(()=> {
                    window.location.assign('/dashboard')
                }, 1000)
            }


        }).catch((e)=> {
            // increment(100)
            // setAuthenticated(false)
            console.log(e)
        })
        

}

    return (
    <>
        <LoadingBar color='#5389da' height={3} progress={stateBar} className='loading-bar'/>
        <div className="above-all"></div>
        { authenticated ? <div id="successful"> <p>Welcome, {nameUser}!</p></div> : '' }
        <animated.div style={props}>
            <div className="signin-page">
                <section className="signin-block">
                    <div className="row-1-signin">
                    <h1 className="signin-h1">Sign in</h1>
                    <FaTimes className="cancel" onClick={()=> {
                        history.push('/')
                    }}/>
                    </div>
                    <form className="form-signin" onSubmit={handleSubmit(onSubmit)}>
                        <input type="email" {...register("Email", {required: true})} placeholder="email address" className="email" onChange={(e)=> (setInvalidEmail(false), e.target.style.borderColor = "#8A7F9E20")}/>
                        { (errors.Email) && (errors.Email.type) == "required" ? (catchErr(document.getElementsByClassName('email')[0]), <p className="error" id="email-err">Email is required</p>) : invalidEmail && (catchErr(document.getElementsByClassName('email')[0]), <p className="error" id="email-err">This email is not associated with any existing account!</p>) }
                        
                        <input type="password" {...register("password", {required: true, minLength: 10,maxLength: 24})} placeholder="password" className="password" onChange={(e)=> (setWrongP(false), e.target.style.borderColor = "#8A7F9E20")} />
                        {/* handling errors */}
                        { (errors.password) && (errors.password.type) == "required" ? (catchErr(document.getElementsByClassName('password')[0]),
                        <p className="error" id="password-err">Password is required!</p>) :
                         wrongP ? (catchErr(document.getElementsByClassName('password')[0]), <p className="error" id="password-err">Incorrect password!</p>) 
                         :  (errors.password) && (errors.password.type) == "minLength" ? (catchErr(document.getElementsByClassName('password')[0]),
                         <p className="error" id="password-err">Password should have minLength of at least 10 characters!</p>) 
                         : (errors.password) && (errors.password.type) == "maxLength" && (catchErr(document.getElementsByClassName('password')[0]),
                         <p className="error" id="password-err">Password should have maxLength of at least 24 characters!</p>) }
                        { }
                        {  }
                        {/* <div className="checkbox">
                            <input type="checkbox" {...register("checkbox")} name="infinite-session" />
                            <span></span>
                            <label htmlFor="infinite-session" className="checkbox-label">
                                Keep me signed in!
                            </label>
                        </div> */}
                        <input type="submit" className="procceed" value="procceed"/>
                    </form>            
                </section>            
            </div>
        </animated.div>
    </>
    )
}

export default Signin
