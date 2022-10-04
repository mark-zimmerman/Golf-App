import React from 'react';
import ReactDOM from 'react-dom';

import {App} from './components';

const appElement = document.getElementById("root")
const root = ReactDOM.createRoot(appElement)
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
)