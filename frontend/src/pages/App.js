import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { history } from "./history";

// import pages
import LoginPage from "./login";
import ProfilePage from "./profile";
import RegisterPage from "./register";
import RegisterUpdateInfoPage from "./register/update-info";
import TermOfUsePage from "./term-of-use";

function App() {
    
    return (
        <div className="app-container">
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={LoginPage} />
                    <Route exact path="/profile" component={ProfilePage} />
                    <Route exact path="/register" component={RegisterPage} />
                    <Route exact path="/register/update-info" component={RegisterUpdateInfoPage} />
                    <Route exact path="/term-of-use" component={TermOfUsePage} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
