import React, { useState } from 'react'
import regeneratorRuntime from 'regenerator-runtime'
import { useHistory } from "react-router-dom"

// animation
import LoadingBar from 'react-top-loading-bar'

//hand-made components
import Nav from '../Nav'
import SignupForm from './SignupForm'

const Step1 = ({ onSuccessful }) => {
    const history = useHistory()
    const [alreadyExist, setAlreadyExist] = useState(false)
    const [successfulSignup, successful] = useState(false)

    const [stateBar, setStateBar] = useState(0)
    // increment bar value, loading bar!
    const increment = async (progress) => {
        document.querySelector('.above-all').style.setProperty('display', 'flex')
        for (let index = 0; index <= progress; index++) {
            setStateBar(index)
            if(index == 100){
                setStateBar(0)
                document.querySelector('.above-all').style.setProperty('display', 'none')
            }
        }
    }

    // handle submit
    const onSubmit = async data => {

        console.log(data)
        increment(40)
        try {
            const res = await fetch('/signup',{
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(data)
            }).then((res)=> {
                increment(80)
                if(res.status != 200) increment(100)
                if(res.status == 409) setAlreadyExist(true)
                if(res.status == 200) setAlreadyExist(false)
                return res.json()
            }).then((data)=> {
                
                if(data.errors){
                    console.log(data.errors)
                }

                else {
                    successful(true)
                    increment(100).then(()=> {
                        history.push('/')
                    })
                }
            })
        }
        catch(e){
            increment(100)
            setFailedFetch(true)
            console.log('errrrrrrrrr')
        }
    }

    return (
        <>
            <div className="above-all"></div>
            <div className="container-main">
                <Nav signin={false}/>
                <LoadingBar color='#5389da' height={3} progress={stateBar} className='loading-bar'/>
                {successfulSignup && <div id="successful"> <p>Successfully Signed up!</p></div>}
                <div className="row-1-signup">
                    <h1 className="row-1-h1">Few steps forward..!</h1>
                </div>
                <section className="row-2-signup">
                    <div className="column-1-signup">
                        <SignupForm onSubmit={onSubmit} alreadyExist={alreadyExist}/>
                        </div>
                    <div className="column-2-signup">
                        <h2>Observe skills, lift yours with practice!</h2>
                        <p>Practice with skilled members, friends or even Ai! <br />
                        •   Each skilled member has his own schedule and you can have your match with him 
                        by sending him <br />
                        a battle request  with your skill points & your desired time for the battle. <br />
                        <br />
                        •   For the other members or friends you can make your own room and start playing<br /> as much as your energy level is above 15% !</p>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Step1
