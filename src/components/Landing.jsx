
import './Landing.css'

import { Link } from "react-router-dom";

export default function Landing(props){
    return(
        <div className="main-container">
            <div className="title-container">
                <h1>BOOK KEEPER</h1>
            </div>
            <div className="landing-container">
                <h2>Read, Explore, Imagine</h2>
                <h3>Set your 2023 reading goal<br/>today</h3>
                <button className='landing-button'onClick={props.buttonFunc}>Start</button>
            </div>
        </div>
    )
}