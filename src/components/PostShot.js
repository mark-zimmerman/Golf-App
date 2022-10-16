import React, { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faSquareCheck, faSquareArrowUpRight} from '@fortawesome/free-solid-svg-icons';

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
    setPar
  } = props;
  const nextShot = () => {
    setPostShot(false);
    setPreShot(true);
    setCurrentShotType("");
    setShot(shot + 1)
  };
  const nextHole = () => {
    setPostShot(false);
    setPreShot(true);
    setHole(hole + 1);
    setCurrentShotType("");
    setShotType("");
    setShot(1);
    setPar(3);
    
  };
  console.log("post curShottype", currentShotType);
  console.log('postshotType', shotType)
  console.log('postclub', club);
  return (
    <div id="post-shot-form-container">
      <form id="post-shot-form">
        <div className="commit-container">
          <label for="commit">Did you commit to your one thought?</label>
          <div className="one-thought-container">
            <input type="radio" value="yes" name="commit" /> Yes
            <input type="radio" value="no" name="commit" /> No
          </div>
        </div>

        {currentShotType === "tee shot" && (
          <div>
            <label>Tee Shot Result</label>
            <div>
              <input type="radio" className="result-arrow" value="left" name="tee-shot-result" />
              <input type="radio" className="result-arrow" value="hit" name="tee-shot-result" />
              <input type="radio" className="result-arrow" value="right" name="tee-shot-result" />
            </div>
          </div>
        )}
        { currentShotType === "Approach" && <div className="result-container">
          <label>Result</label>
          <div className="result-grid">
            <input type="radio" className="result-arrow" value="long left" name="result" />
            <input type="radio" className="result-arrow" value="long" name="result" />
            <input type="radio" className="result-arrow" value="long right" name="result" />
            <input type="radio" className="result-arrow" value="left" name="result" />
            <input type="radio" className="result-arrow" value="hit" name="result" />
            <input type="radio" className="result-arrow" value="right" name="result" />
            <input type="radio" className="result-arrow" value="short left" name="result" />
            <input type="radio" className="result-arrow" value="short " name="result" />
            <input type="radio" className="result-arrow" value="short right" name="result" />
          </div>
        </div>}
        { currentShotType === "Tee Shot" && <div className="result-container">
          <label>Tee Shot Result</label>
          <div className="tee-shot-results">
            <input type="radio" className="result-arrow" value="left" name="result" />
            <input type="radio" className="result-arrow" value="Hit" name="result" />
            <input type="radio" className="result-arrow" value="right" name="result" />
          </div>
        </div>}

        <div className="next-buttons">
          <button className="next-button" onClick={nextShot}>Next Shot</button>
          <button className="next-button" onClick={nextHole}>Next Hole</button>
        </div>
      </form>
    </div>
  );
};

export default PostShot;
