import { React, useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Header, Subheader, Home, PreShot, PostShot, Login } from "./index";

const App = () => {
  const [hole, setHole] = useState(0);
  const [preShot, setPreShot] = useState(false);
  const [postShot, setPostShot] = useState(false);
  const [approach, setApproach] = useState(false);
  const [shotType, setShotType] = useState("");
  const [currentShotType, setCurrentShotType] = useState("");
  const [club, setClub] = useState('Driver');
  const [distance, setDistance] = useState(undefined);
  const [oneThought, setOneThought] = useState('');
  const [commit, setCommit] = useState(null);
  const [result, setResult] = useState('');
  const [fairway, setFairway] = useState('');
  const [green, setGreen] = useState('');
  const [shot, setShot] = useState(1);
  const [par, setPar] = useState(3);
  const [oneThoughtList, setOneThoughtList] = useState(['smooth', "relaxed"]);
  const [score, setScore] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userToken, setUserToken] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [email, setEmail] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const [next, setNext] = useState("");

  useEffect(() => {
    console.log("app useEffect shotType", shotType);
  }, [shotType]);
  return (
    <div id="app">
      <Router>
        <div id="header-container">
          <Header postShot={postShot} setPreShot={setPreShot} setPostShot={setPostShot}/>
          {hole > 0 && <Subheader hole={hole} shot={shot} score={score} />}
        </div>
        {(hole === 0 && !userToken)  && (
          <Home setHole={setHole} hole={hole} setPreShot={setPreShot} />
        )}
        { userToken && <Login
              userToken={userToken}
              setUserToken={setUserToken}
              userName={userName}
              userPassword={userPassword}
              setUserName={setUserName}
              setUserPassword={setUserPassword}
              email={email}
              setEmail={setEmail}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
            />}
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
            distance={distance}
            oneThought={oneThought}
            par={par}
            score={score}
            setScore={setScore}
            setOneThought={setOneThought}
            next={next}
            setNext={setNext}
          />
        )}
      </Router>
    </div>
  );
};

export default App;
