import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {NavLink} from "react-router-dom";

const App = (props) => {
    const {postShot, setPreShot, setPostShot} = props
    const goBack = () => {
        setPreShot(true);
        setPostShot(false);
      }
    return (
        <div id="header-container">
            <div id="top-header-container">
                {postShot && 
                <div className="back-btn-container">
                    <button className="back-btn" onClick={goBack}>Back</button>
                </div>}
                <div> 
                    <p>Caddie App</p>
                </div>
                <div>
                    <p>Menu</p>
                </div>
            </div>
        </div>
    )
}

export default App;