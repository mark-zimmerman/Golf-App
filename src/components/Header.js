import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {NavLink} from "react-router-dom";

const App = () => {
    return (
        <div id="header-container">
            <div id="top-header-container">
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