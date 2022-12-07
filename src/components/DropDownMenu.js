import React from 'react';
import axios from 'axios';


const DropDownMenu = (props) => {
    const {setShot, par, setPar, hole, userName, score, setScore, open, setOpen, stats, setStats, setPreShot, setPostShot, setHole, userToken, setUserToken, shotType, setShotType} = props;
    
    const deleteRound = async () => {
        try {
            const response =  await axios.delete("/api/round",{
             data: {
              username: userName,
            }});
        }
        catch (error) {
            console.log(error);
        }
    }
    
    const handleNewRound = () => {
        setOpen(!open);
        setPreShot(false);
        setPostShot(false);
        setStats(false);
        setHole(0);
        setScore(null);
        setShotType("");
        setPar(3);
        setShot(1);
        
        deleteRound();
    }
   
    const handleStats = () => {
        setOpen(!open);
        setStats(true);
    }
    const handleHome = () => {
        setStats(false);
        setPreShot(false);
        setPostShot(false);
        setHole(0);
        setOpen(!open)
    }   
    const handleLogOut = () => {
        setUserToken('');
        setOpen(!open);
        setPreShot(false);
        setPostShot(false);
        setStats(false);
        setHole(0);
        setScore(null);
    }
    
    return (
        <ul className="menu"> 
             { userToken &&
                <li className="menu-item">
                    <button onClick={handleLogOut}>Log Out</button>
                </li>
             }
             <li className="menu-item">
                <button onClick={handleHome}>Home</button>
            </li>
            <li className="menu-item">
                <button onClick={handleNewRound}>New Round</button>
            </li>
            <li className="menu-item">
                <button onClick={handleStats}>Stats</button>
            </li>
        </ul> 
    )
}

export default DropDownMenu;