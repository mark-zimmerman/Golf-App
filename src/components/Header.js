import {React, useState} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {NavLink} from "react-router-dom";

const Header = (props) => {
    const {postShot, setPreShot, setPostShot, setStats, open, setOpen, provisional, setProvisional} = props
    
    const goBack = () => {
        if (provisional) {
            setProvisional(!provisional)
        } else {
            setPreShot(true);
            setPostShot(false);
        }
      }
    const handleOpen = () => {
        setOpen(!open);
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
                    <div className="dropdown">
                        <button className="menu-btn" onClick={handleOpen}>Menu</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;