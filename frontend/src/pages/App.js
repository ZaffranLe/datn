import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { history } from "./history";

// import pages
import LoginPage from "./login";
import RegisterPage from "./register";
import RegisterUpdateInfoPage from "./register/update-info";
import TermOfUse from "./term-of-use";

function App() {
    return (
        <div className="container-fluid app-container">
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={LoginPage} />
                    <Route exact path="/register" component={RegisterPage} />
                    <Route exact path="/register/update-info" component={RegisterUpdateInfoPage} />
                    <Route exact path="/term-of-use" component={TermOfUse} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
