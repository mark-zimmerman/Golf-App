import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {NavLink} from "react-router-dom";

const Home = (props) => {
    const {setHole} = props;
    return (
        
            <div id="home-container">
                <div id="home-inner-container">
                    <button onClick={()=> {setHole(1)}}>Start Round</button>
                </div>
            </div>
    
    )
}

export default Home;