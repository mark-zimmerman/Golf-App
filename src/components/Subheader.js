import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {NavLink} from "react-router-dom";

const Subheader = (props) => {
    const {hole, shot, score} = props;
    return (
        
            <div id="sub-header-container">
                <div> 
                    <p>Shot: {shot}</p>
                </div>
                <div> 
                    <p>Hole: {hole}</p>
                </div>
                <div>
                    <p className="score-display">Score:{score > 0 && <p>+</p>}{!score && <p>-</p>}{score}</p>
                </div>
            </div>
    
    )
}

export default Subheader;