import React, { useEffect, useState } from "react";
// import { addShot } from "../../db/models/roundModel";
import axios from "axios";

const PostShot = (props) => {
  const {
    setPostShot,
    hole,
    setHole,
    setPreShot,
    shotType,
    setShotType,
    currentShotType,
    setCurrentShotType,
    commit,
    result,
    fairway,
    green,
    setCommit,
    setFairway,
    setResult,
    setGreen,
    club,
    shot,
    setShot,
    setPar,
    distance,
    oneThought,
    par,
    score,
    setScore,
    setOneThought,
    next,
    setNext,
    setStats,
    postShot,
    preShot,
    userName,
    currentUserId
  } = props;
  
  //add shot to database
  const addShot = async () => {
    try {
      const response = await axios.post(
        "/api/round/shot", 
        {
        id: currentUserId,
        shot: shot,
        hole: hole,
        par: par,
        shotType: shotType,
        club: club,
        distance: distance,
        oneThought: oneThought,
        commit: commit,
        result: result,
      });
    } catch (error) {
      console.error(error.response.data);
    }
  };
  const addRound = async () => {
    console.log("were in the add round function")
    try {
      const response = await axios.post(
        "/api/rounds", { username: userName, id: currentUserId});
      setPreShot(false);
      setPostShot(false);
      setStats(true);
      setCurrentShotType("");
      setShotType("");
      setShot(1);
      setPar(3);
      setOneThought("");
      setResult("");
      setCommit(null);
      setScore(null);
      // deleteRound();
      console.log(preShot);
      console.log(postShot);
    } catch (error) {
      console.log(error);
    }
  }
  // const deleteRound = async () => {
  //   try {
  //     const response =  await axios.delete("/api/round");
  //   }
  //   catch (error) {
  //     console.log(error);
  //   }
  // }
  const scoreOnHole = () => {
    const relToPar = shot - par;
    setScore(score + relToPar);
  }
  const nextShot = (e) => {
    e.preventDefault();
    setNext("shot");
    addShot();
    setPostShot(false);
    setPreShot(true);
    setCurrentShotType("");
    setShot(shot + 1);
    setOneThought("");
    setResult("");
    setCommit(null);
  };

  const nextHole = (e) => {
    e.preventDefault();
    setNext("hole");
    scoreOnHole();
    addShot();
    if (hole > 18 ) {
      console.log('were about to call the addROund func')
      addRound();
      setStats(true);
      setPostShot(false);
      //setRoundOver
    } else {
      setPostShot(false);
      setPreShot(true);
      setHole(hole + 1);
      setCurrentShotType("");
      setShotType("");
      setShot(1);
      setPar(3);
      setOneThought("");
      setResult("");
      setCommit(null);
    }
    
  };

 
  return (
    <div id="post-shot-form-container">
      <form id="post-shot-form">
        <div className="commit-container">
          <label for="commit">Did you commit to your swing thought?</label>
          <div className="one-thought-container">
            <input type="radio" value={true} name="commit" required onChange={(e)=> setCommit(e.target.value)}/> Yes
            <input type="radio" value={false} name="commit" required onChange={(e)=> setCommit(e.target.value)}/> No
          </div>
        </div>

        {currentShotType === "Approach" && (
          <div className="result-container">
            <label>Result</label>
            <div className="result-grid">
              <input
                type="radio"
                className="result-arrow"
                value="long left"
                name="result"
                required
              />
              <input
                type="radio"
                className="result-arrow"
                value="long"
                name="result"
                onChange={(e)=> setResult(e.target.value)}
              />
              <input
                type="radio"
                className="result-arrow"
                value="long right"
                name="result"
                onChange={(e)=> setResult(e.target.value)}
              />
              <input
                type="radio"
                className="result-arrow"
                value="left"
                name="result"
                onChange={(e)=> setResult(e.target.value)}
              />
              <input
                type="radio"
                className="result-arrow"
                value="hit"
                name="result"
                onChange={(e)=> setResult(e.target.value)}
              />
              <input
                type="radio"
                className="result-arrow"
                value="right"
                name="result"
                onChange={(e)=> setResult(e.target.value)}
              />
              <input
                type="radio"
                className="result-arrow"
                value="short left"
                name="result"
                onChange={(e)=> setResult(e.target.value)}
              />
              <input
                type="radio"
                className="result-arrow"
                value="short"
                name="result"
                onChange={(e)=> setResult(e.target.value)}
              />
              <input
                type="radio"
                className="result-arrow"
                value="short right"
                name="result"
                onChange={(e)=> setResult(e.target.value)}
              />
            </div>
          </div>
        )}
        {currentShotType === "Tee Shot" && (
          <div className="result-container">
            <label>Tee Shot Result</label>
            <div className="tee-shot-results">
              <input
                type="radio"
                className="result-arrow"
                value="left"
                name="result"
                required
                onChange={(e)=> setResult(e.target.value)}
              />
              <input
                type="radio"
                className="result-arrow"
                value="Hit"
                name="result"
                onChange={(e)=> setResult(e.target.value)}
              />
              <input
                type="radio"
                className="result-arrow"
                value="right"
                name="result"
                onChange={(e)=> setResult(e.target.value)}
              />
            </div>
          </div>
        )}
        { shotType === "approach" || shotType === "teeShot" ? (
          <div className="next-buttons">
            <button className="next-button" name="next" onClick={(result && commit !== null) ? nextHole : undefined} value="hole" >
              Next Hole
            </button>
            <button className="next-button" name="next" onClick={(result && commit !== null) ? nextShot : undefined} value="shot" >
              Next Shot
            </button>
          </div>) : (
        <div className="next-buttons">
          <button className="next-button" name="next" onClick={(commit !== null) ? nextHole : undefined} value="hole" >
            Next Hole
          </button>
          <button className="next-button" name="next" onClick={(commit !== null) ? nextShot : undefined} value="shot" >
            Next Shot
          </button>
        </div> )
        }
      </form>
    </div>
  );
};

export default PostShot;
