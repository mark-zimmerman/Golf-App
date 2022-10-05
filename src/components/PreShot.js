import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {NavLink} from "react-router-dom";

const PreShot = (props) => {
    const {hole} = props;
    return (
        
            <div id="pre-shot-form-container">
                <form id="pre-shot-form">
                    <div className="shot-type-container">    
                        <label for="shot-type">Shot Type</label>
                        <div>
                            <input type="radio" value="Tee Shot" name="shot-type" /> Tee Shot
                            <input type="radio" value="Approach" name="shot-type"  /> Lay Up
                            <input type="radio" value="Lay Up" name="shot-type"  /> Approach
                        </div>
                    </div>
                    <div className="club-container">   
                        <label for="club">Club</label>
                        <select name="club" id="club">
                            <option value="Driver">Driver</option>
                            <option value="3-wood">3-wood</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="4-Iron">4-Iron</option>
                            <option value="5-Iron">5-Iron</option>
                            <option value="6-Iron">6-Iron</option>
                            <option value="7-Iron">7-Iron</option>
                            <option value="8-Iron">8-Iron</option>
                            <option value="9-Iron">9-Iron</option>
                            <option value="Pitching Wedge">Pitching Wedge</option>
                            <option value="Gap Wedge">Gap Wedge</option>
                            <option value="Lob Wedge">Lob Wedge</option>
                        </select>
                    </div> 
                    <div className="distance-container">   
                        <label for="distance">Distance to Target</label>
                        <input type="number" name="distance" min="" max=""></input> 
                    </div>
                    <div className="one-thought-container">   
                        <label for="distance">One Thought</label>
                        <input type="text" name="distance" min="" max=""></input> 
                    </div>
                    <button>Hit Shot</button>
                </form>   
                
            </div>
    
    )
}

export default PreShot;