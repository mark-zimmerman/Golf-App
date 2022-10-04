import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {Header} from './index'
const App = () => {
    return (
        <div>
            <Router>
                <Header/>
            </Router>
        </div>
    )
}

export default App;