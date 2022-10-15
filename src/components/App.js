import { React, useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Header, Subheader, Home, PreShot, PostShot } from "./index";
const App = () => {
  const [hole, setHole] = useState(0);
  const [preShot, setPreShot] = useState(false);
  const [postShot, setPostShot] = useState(false);
  const [approach, setApproach] = useState(false);
  const [shotType, setShotType] = useState("");
  const [currentShotType, setCurrentShotType] = useState("");
  const [club, setClub] = useState('Driver');
  const [distance, setDistance] = useState('');
  const [oneThought, setOneThought] = useState('Hmmm');
  const [commit, setCommit] = useState('');
  const [result, setResult] = useState('');
  const [fairway, setFairway] = useState('');
  const [green, setGreen] = useState('');
  const [shot, setShot] = useState(1);
  const [par, setPar] = useState(3);
  const [oneThoughtList, setOneThoughtList] = useState(['smooth', "relaxed"]);

  useEffect(() => {
    console.log("app useEffect shotType", shotType);
  }, [shotType]);
  return (
    <div id="app">
      <Router>
        <div id="header-container">
          <Header />
          {hole > 0 && <Subheader hole={hole} shot={shot} />}
        </div>
        {hole === 0 && (
          <Home setHole={setHole} hole={hole} setPreShot={setPreShot} />
        )}
        {preShot && (
          <PreShot
            approach={approach}
            setApproach={setApproach}
            setPostShot={setPostShot}
            setPreShot={setPreShot}
            setShotType={setShotType}
            shotType={shotType}
            currentShotType={currentShotType}
            setCurrentShotType={setCurrentShotType}
            club={club}
            setClub={setClub}
            distance={distance}
            setDistance={setDistance}
            oneThought={oneThought}
            setOneThought={setOneThought}
            par={par}
            setPar={setPar}
            shot={shot}
            oneThoughtList={oneThoughtList}
            setOneThoughtList={setOneThoughtList}
          />
        )}
        {postShot && (
          <PostShot
            setPostShot={setPostShot}
            hole={hole}
            setHole={setHole}
            setPreShot={setPreShot}
            currentShotType={currentShotType}
            setCurrentShotType={setCurrentShotType}
            commit={commit}
            result={result}
            fairway={fairway}
            green={green}
            setCommit={setCommit}
            setResult={setResult}
            setFairway={setFairway}
            setGreen={setGreen}
            club={club}
            shot={shot}
            setShot={setShot}
            shotType={shotType}
            setShotType={setShotType}
            setPar={setPar}
            oneThoughtList={oneThoughtList}
            setOneThoughtList={setOneThoughtList}

          />
        )}
      </Router>
    </div>
  );
};

export default App;
