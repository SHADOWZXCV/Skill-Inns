import React from 'react'

// hand-made components
import Buttons from './Buttons'

const Content = () => {
    return (
        <>
         <section className="section-landing">
             <div className="left-side">
                <h1>A platform where you belong to a community</h1>
                <p>Skill'Inns is meant for anyone who likes traditional games... challange your friends in your speciality. <br/>
                    Learn & improve your skills by observing other skilled members.<br />
                    Share the battle with people and create your own glory! 
                </p> 
                <Buttons />
             </div>
             <div className="right-side">
                <img className="chess" src="../static/chess.png"></img>
                <img className="dice" src="../static/Dice.png"></img>
             </div>
         </section>   
        </>
    )
}

export default Content
