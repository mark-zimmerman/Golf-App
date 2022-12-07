import { React, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { NavLink } from "react-router-dom";

const PreShot = (props) => {
  const {
    hole,
    approach,
    setApproach,
    setPostShot,
    setPreShot,
    setShotType,
    shotType,
    setCurrentShotType,
    club,
    distance, 
    oneThought,
    setClub,
    setDistance,
    setOneThought,
    par,
    setPar, 
    shot,
    oneThoughtList,
    setOneThoughtList
  } = props;
  
  const updateShot = () => {
      setPostShot(true);
      setPreShot(false);
      setCurrentShotType(shotType);
      if (oneThoughtList.includes(oneThought) === false && oneThought !== "") {
        if (oneThoughtList.length > 4) {
          oneThoughtList.shift();
        }
      setOneThoughtList([...oneThoughtList, oneThought]);
    }     
  };
  const handleInput = (e) => {
    let curThought = e.target.value;
    e.preventDefault();
    setOneThought(curThought);
  }
  return (
    <div id="pre-shot-form-container">
      <form id="pre-shot-form" onSubmit={updateShot}>
        {shot === 1 && <div>
            <label>Par</label>
            <div>
                <select 
                value={par}
                onChange={(e)=> setPar(e.target.value)}
                >
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
        </div>}    
        <div className="shot-type-wrapper">
          <label>Shot Type</label>
          <div>
            { (par > 3 && shot === 1) &&
            <div className="shot-type-container">
                <input
                type="radio"
                value="Tee Shot"
                name="shot-type"
                required
                onChange={(e) => setShotType(e.target.value)}
                />
                <label className="shot-type-label">Tee Shot</label>
            </div>
            }
            {(shot > 1 && shotType !== 'Putt') && <div className="shot-type-container">
                <input
                className="shot-type-input"
                type="radio"
                value="Lay Up"
                name="shot-type"
                required
                onChange={(e) => setShotType(e.target.value)}
                />
                <label className="shot-type-label">Lay Up</label>
            </div>}
            {( (shot > 1 || par == 3) && (shotType !== 'Putt') )&&
             <div className="shot-type-container"> 
                <input
                className="shot-type-input"
                type="radio"
                value="Approach"
                name="shot-type"
                required
                onChange={(e) => setShotType(e.target.value)}
                /> 
                <label className="shot-type-label">Approach</label>
             </div>  
            }   
            {(shot > 1 && shotType !== 'Putt')&& <div className="shot-type-container">
                <input
                className="shot-type-input"
                type="radio"
                value="Chip/Pitch"
                name="shot-type"
                required
                onChange={(e) => setShotType(e.target.value)}
                />
                <label className="shot-type-label">Chip/Pitch under 60 yds</label>
            </div>}
            {shot > 1 && <div className="shot-type-container">
                <input
                className="shot-type-input"
                type="radio"
                value="Putt"
                name="shot-type"
                required
                onChange={(e) => setShotType(e.target.value)}
                />
                <label className="shot-type-label">Putt</label>
            </div>}
          </div>
        </div>

        { shotType !== 'Putt' &&
        <div className="club-container">
          <label>Club</label>
          <select 
          value={club}
          onChange={(e)=> setClub(e.target.value)}
          >
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
            <option value="Sand Wedge">Sand Wedge</option>
            <option value="Lob Wedge">Lob Wedge</option>
          </select>
        </div>}
        {shotType === "Approach" && (
          <div className="distance-container">
            <label>Distance to Target</label>
            <input type="number" name="distance" value={distance} required onChange={(e)=> setDistance(e.target.value)}></input>
          </div>
        )}
        { shotType !== 'Putt' && <div className="one-thought-container">
          <label>Swing Thought</label>
          <input 
          type="text" 
          value={oneThought}
          onChange={(e)=> setOneThought(e.target.value)}
          required
          ></input>
        </div>}
        {shotType !== 'Putt' && <div className="prevOneThoughts">
          {oneThoughtList.map((thought, index) => (
                    <button onClick={(e)=> handleInput(e)} value={thought} className="prevOneThoughtBtn">{thought}</button>
             ))}
        </div>}
        {shotType !== "Putt" ? <button typeof="submit">Hit Shot</button> :
        <button typeof="submit">Putt</button>
        }
      </form>
    </div>
  );
};

export default PreShot;
