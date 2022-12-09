import { React, useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import DropDownMenu from "./DropDownMenu";
import { Header, Subheader, Home, PreShot, PostShot, Login, Stats } from "./index";

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
  const [userName, setUserName] = useState("markzimmerman");
  const [userToken, setUserToken] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [email, setEmail] = useState("");
  const [currentUserId, setCurrentUserId] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const [next, setNext] = useState("");
  const [stats, setStats] = useState(false);
  const [roundQuantity, setRoundQuantity] = useState(0);
  const [open, setOpen] = useState(false);
  const [provisional, setProvisional] = useState(false);
  const [outOfBounds, setOutOfBounds] = useState(false);


  useEffect(() => {
    console.log("app useEffect shotType", shotType);
  }, [shotType]);
  console.log(userName);
  
  return (
    <div id="app">
      <Router>
        <div id="header-container">
          <Header provisional={provisional} setProvisional={setProvisional} postShot={postShot} setPreShot={setPreShot} setPostShot={setPostShot} setStats={setStats} open={open} setOpen={setOpen}/>
          {(hole > 0 && !stats) && <Subheader hole={hole} shot={shot} score={score} />}
        </div>
        { open ? <DropDownMenu setShot={setShot} par={par} setPar={setPar} userName={userName} shotType={shotType} setShotType={setShotType} score={score} setScore={setScore} setUserToken={setUserToken} userToken={userToken} open={open} setOpen={setOpen} stats={stats} setStats={setStats} setPreShot={setPreShot} setPostShot={setPostShot} setHole={setHole}/> : null }
        {(hole === 0 && userToken && !stats && !postShot && !preShot)  && (
          <Home setHole={setHole} hole={hole} setPreShot={setPreShot} />
        )}
        { (stats && userToken) && <Stats userName={userName} setRoundQuantity={setRoundQuantity}/> }
        { !userToken && <Login
              userToken={userToken}
              setUserToken={setUserToken}
              userName={userName}
              userPassword={userPassword}
              setUserName={setUserName}
              setUserPassword={setUserPassword}
              email={email}
              setEmail={setEmail}
              currentUserId={currentUserId}
              setCurrentUserId={setCurrentUserId}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
            />}
        {(preShot && !stats && userToken)&& (
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
        {(postShot && !stats && userToken)&& (
          <PostShot
            outOfBounds={outOfBounds}
            setOutOfBounds={setOutOfBounds}
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
            setStats={setStats}
            userName={userName}
            currentUserId={currentUserId}
            provisional={provisional}
            setProvisional={setProvisional}
          />
        )}
      </Router>
    </div>
  );
};

export default App;
