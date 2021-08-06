import React from 'react'
import { FaTimes } from "react-icons/fa";


// animation
import { useSpring, animated } from 'react-spring'

// form library
import { useForm } from 'react-hook-form'

const catchErr = (e)=> {
    e.style.borderColor = "#D9353A"
}

const SignupForm = ({ onSubmit, alreadyExist }) => {
    const props = useSpring({opacity: 1, from: {opacity: 0}, config: { duration: 200}})
    // establish hook form
    const { register, handleSubmit, formState: {errors} } = useForm()

    return (
    <animated.div style={props}>
            <section className="signup-block">
                <form className="form-signup" onSubmit={handleSubmit(onSubmit)}>
                    <h2>Create an Account</h2>
                    <div className="row-form-signup">
                        {/* first-name */}
                        <div className="row-column-form-signup">
                            <input type="text" {...register("first-name", {required: true, pattern: {value:/^[A-Za-z0-9_-]+$/i, message: 'only alphanumerics, - & _ are available to use!'}})} placeholder="First name" className="first-name"/>
                            { (errors['first-name']) && (errors['first-name'].type) == "required" && (catchErr(document.getElementsByClassName('first-name')[0]), <p className="error" id="first-name-err">This field is required</p>) }
                            { (errors['first-name']) && (errors['first-name'].type) == "pattern" && (catchErr(document.getElementsByClassName('first-name')[0]), <p className="error" id="first-name-err">{errors['first-name'].message}</p>) }
                        </div>
                        
                        {/* last-name */}
                        <div className="row-column-form-signup">
                            <input type="text" {...register("last-name", {required: true, pattern: {value:/^[A-Za-z0-9_-]+$/i, message: 'only alphanumerics, - & _ are available to use!'}})} placeholder="Last name" className="last-name"/>
                            { (errors['last-name']) && (errors['last-name'].type) == "required" && (catchErr(document.getElementsByClassName('last-name')[0]), <p className="error" id="last-name-err">This field is required</p>) }
                            { (errors['last-name']) && (errors['last-name'].type) == "pattern" && (catchErr(document.getElementsByClassName('last-name')[0]), <p className="error" id="last-name-err">{errors['last-name'].message}</p>) }
                        </div>
                    </div>

                    {/* Email */}
                    <input type="email" {...register("Email", {required: true})} placeholder="email address" className="email" id="email-signup"/>
                    { (errors.Email) && (errors.Email.type) == "required" ? (catchErr(document.getElementsByClassName('email')[0]), <p className="error" id="email-err">Email is required</p>) : alreadyExist ? (catchErr(document.getElementsByClassName('email')[0]),  catchErr(document.getElementsByClassName('username')[0]), <p className="error" id="email-err">A user with this email or username already exist!</p>) : ''}
                    
                    {/* Username */}
                    <input type="text" {...register("username", {required: true, pattern: {value:/^[A-Za-z0-9_-]+$/i, message: 'only alphanumerics, - & _ are available to use!'}, minLength: 5})} placeholder="username" className="username" />
                    { (errors.username) && (errors.username.type) == "pattern" && (catchErr(document.getElementsByClassName('username')[0]), <p className="error" id="username-err">{errors.username.message}</p>) }
                    { (errors.username) && (errors.username.type) == "required" && (catchErr(document.getElementsByClassName('username')[0]), <p className="error" id="username-err">username is required</p>) }
                    { (errors.username) && (errors.username.type) == "minLength" && (catchErr(document.getElementsByClassName('username')[0]), <p className="error" id="username-err">username must be at least 5 length!</p>) }

                    {/* Password */}
                    <input type="password" {...register("password", {required: true, minLength: 10,maxLength: 24, pattern: {value:/^[A-Za-z0-9!@#$&_-]+$/i, message: 'only alphanumerics, _-!@#$&* are available to use!'}})} placeholder="password" className="password" id="password-signup" />
                    {/* handling errors */}
                    { (errors.password) && (errors.password.type) == "required" && (catchErr(document.getElementsByClassName('password')[0]),
                    <p className="error" id="password-err">Password is required!</p>) }
                    { (errors.password) && (errors.password.type) == "minLength" && (catchErr(document.getElementsByClassName('password')[0]),
                    <p className="error" id="password-err">Password should have minLength of at least 10 characters!</p>) }
                    { (errors.password) && (errors.password.type) == "maxLength" && (catchErr(document.getElementsByClassName('password')[0]),
                    <p className="error" id="password-err">Password should have maxLength of at least 24 characters!</p>) }
                    { (errors.password) && (errors.password.type) == "pattern" && (catchErr(document.getElementsByClassName('password')[0]), <p className="error" id="password-err">{errors.password.message}</p>) }
                    <input type="submit" className="create-account" value="Create an Account"/>
                </form>            
            </section>            
    </animated.div>
    )
}

export default SignupForm
