import React,{FC} from "react";
import {Redirect, Route, Router} from "./components";
import {Detail, Search} from "./routes";
import './assets/yekan-font/fonts.css';

const App:FC<any> = () => (
    <Router>
        <Route path={'/search/:search'} component={Search}/>
        <Route path={'/search/:search/:id'} component={Detail}/>
        <Redirect from={'/'} to={'/search/'} />
    </Router>
);

export default App;
