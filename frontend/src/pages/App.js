import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { history } from "./history";

// import pages
import LoginPage from "./login";
import RegisterPage from "./register";

function App() {
    return (
        <div className="container-fluid app-container">
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={LoginPage} />
                    <Route exact path="/register" component={RegisterPage} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
