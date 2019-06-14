import React from 'react';

import Home from "./Home";
import Board from "./Board/index"

import "./App.scss";

import {BrowserRouter, Route, Link} from "react-router-dom";

import {Provider} from 'mobx-react';
import Stores from "./Stores";
import Login from "./Board/Login";



const App = ()=>(
    <Provider stores={Stores}>
        <BrowserRouter>
            <header className="app-header">
                <ul className="menu-bar">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/board">Board</Link></li>
                    <li><Login/></li>
                </ul>
            </header>
            <section className="app-body">

                <Route path = "/" exact component={Home}/>
                <Route path = "/board/:command?/:postid?" exact component={Board}/>
            </section>


        </BrowserRouter>
    </Provider>
)

// function App() {
//   return (
//     <div className="App">
//       <Home/>
//       <Page1/>
//       <Page2/>
//       <Page3/>
//     </div>
//   );
// }

export default App;
