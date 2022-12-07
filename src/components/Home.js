import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {NavLink} from "react-router-dom";

const Home = (props) => {
    const {setHole, setPreShot, hole} = props;
    const preShotActive = () => {
        setHole(hole + 1);
        setPreShot(true);
    }
    return (
        
            <div id="home-container">
                <div>

                </div>
                <div id="home-inner-container">
                    <button className="start-btn" onClick={preShotActive}>Start Round</button>
                </div>
                <div id="quote-container">
                    <p>"The time to focus your mind on key swing thoughts is as you settle into your final address position."</p>
                    <h2>- Jack Nicklaus</h2>
                </div>
            </div>
    
    )
}

export default Home;