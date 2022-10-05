import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {NavLink} from "react-router-dom";

const Subheader = (props) => {
    const {hole} = props;
    return (
        
            <div id="sub-header-container">
                <div> 
                    <p>Shot: 1</p>
                </div>
                <div> 
                    <p>Hole: {hole}</p>
                </div>
                <div>
                    <p>Score: -</p>
                </div>
            </div>
    
    )
}

export default Subheader;