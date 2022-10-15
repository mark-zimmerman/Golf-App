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
                <div id="home-inner-container">
                    <button onClick={preShotActive}>Start Round</button>
                </div>
            </div>
    
    )
}

export default Home;