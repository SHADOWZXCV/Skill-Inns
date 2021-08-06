import React, { useState } from 'react'
import { FaUserAlt } from 'react-icons/fa'
// style & animation
import { useSpring, animated } from 'react-spring'
import LoadingBar from 'react-top-loading-bar'

// controllers
import cookie from '../../controller/cookie'

// hand-made components
import Nav from '../Nav'


const name = cookie.getCookie('name')
let imgFile

const Setup1 = () => {

    const [stateBar, setStateBar] = useState(0)
    const [dashboard, setD] = useState(false)

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
    const uploadImg = ()=> {
        increment(80)
        const formData = new FormData()
        formData.append('image', imgFile)
        fetch('http://localhost:3000/setup', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: formData
        }).then((res)=> {
            return res.json()
        }).then((data)=> {
            increment(100)
            setD(true)
            cookie.removeCookie('first')
            console.log(data)
            if(data['dashboard']){
                window.location.replace('/dashboard')
            }
        })
    }
    
    const handleImage = (e)=> {
        setImg(URL.createObjectURL(e.target.files[0]))
        imgFile = e.target.files[0]
        // preload
        // const formData = new FormData()
        // formData.append('image', e.target.files[0])
        // fetch('http://localhost:3000/setup', {
        //     method: 'POST',
        //     mode: 'cors',
        //     credentials: 'include',
        //     body: formData
        // }).then((res)=> {
        //     return res.text()
        // }).then((data)=> {
        //     console.log(data)
        // })
    }
    const [image,setImg] = useState(null)

    const props = useSpring({top: 0, opacity: 1, from: {top: -50, opacity: 0}, config: { duration: 1000}})
    const props2 = useSpring({top: 0, opacity: 1, from: {top: -50, opacity: 0},delay: 1500 , config: { duration: 1000 }})
    return (
        <>
        <LoadingBar color='#5389da' height={3} progress={stateBar} className='loading-bar'/>
        <div className="above-all"></div>
        <div className="container-main">
        { dashboard ? <div id="successful"> <p>Profile picture has been set!</p></div> : '' }
        <Nav signin={false}/>
        <animated.div style={props}>
            <section className="center-row-1-h1">
                {image && 
                    <div id="row-flex" className='full-width'>
                        <div id='column-flex' className="margin-left">
                    <h1 id="hey-confirm">Seems good, isn't it ?</h1>
                    <div id='block-user' className="margin-left-pic">
                            <span id="pp_pic_pp">
                                <form className="pp-add">
                                    <input type='file' onChange={handleImage} accept="image/*"/>
                                </form>
                                <img id="pp_pic" src={image} />
                            </span>
                            {/* animate and dynamic after testing */}
                            <div id="column-flex" className="padding-column">
                                <h3 id="user-name">Alex Thompson</h3>
                                <p id="bio">Brave and skilled, love challanges!</p>
                            </div>
                        </div>
                        <div id='row-flex'>
                            <button className="features-btn continue-btn" onClick={uploadImg}>Continue</button>
                            <button className="features-btn skip-btn user-skip">Skip</button>
                        </div>
                    </div>
                    <div id="column-flex" className="float-right">
                        <h1 id="h1-bio-details">Your online card</h1>
                    </div>
                    </div>
                    }
                {!image && <div id='column-flex' className="text-center">
                <h1 id="hey">Hi there {name}, you want to specify a profile picture? </h1>
                <div id="row-flex"className="margin-left-pp">
                                <span id="pp">
                                <form className="pp-add">
                                    <input type='file' onChange={handleImage} accept="image/*" />
                                </form>
                                    <FaUserAlt size="35" color="#2D2934" />
                                </span>
                                <animated.div style={props2}><h4 id="tutorial"> ±-- Click on the user icon to pick your profile picture!</h4></animated.div>
                </div>
                                <button className="features-btn skip-btn">Skip</button>
                </div>
                                }
                                 <form id="upload_form" encType="multipart/form-data">
                                </form>
            </section>

        </animated.div>
        </div>
        </>
    )
}

// design the setup section
// make it first-time-sign-in-only

export default Setup1
