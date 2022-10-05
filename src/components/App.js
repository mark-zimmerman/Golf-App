import {React, useState} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {Header, Subheader, Home, PreShot} from './index';
const App = () => {
    const [hole, setHole] = useState(0);
    const [preShot, setPreShot] = useState(false);
    const [postShot, setPostShot] = useState(false);
    return (
        <div id="app">
            <Router>
            <div id="header-container">
                <Header/>
                { hole > 0 && <Subheader hole={hole}/> }
            </div>
            {hole === 0 && <Home setHole={setHole}/>}
            { hole > 0 && <PreShot/>}
            </Router>
        </div>
    )
}

export default App;