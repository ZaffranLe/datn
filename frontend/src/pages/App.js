import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { AuthLayout, ImageModal } from "../components";
import { history } from "./history";
// import pages
import LoginPage from "./login";
import ProfilePage from "./profile";
import RegisterPage from "./register";
import RegisterUpdateInfoPage from "./update-info";
import TermOfUsePage from "./term-of-use";
import ExplorePage from "./explore";

function AuthRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={(matchProps) => (
                <AuthLayout>
                    <Component {...matchProps} />
                </AuthLayout>
            )}
        />
    );
}

function App() {
    return (
        <div className="app-container">
            <Router history={history}>
                <Switch>
                    <AuthRoute exact path="/profile/:slug" component={ProfilePage} />
                    <AuthRoute exact path="/profile" component={ProfilePage} />
                    <AuthRoute exact path="/" component={ExplorePage} />
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/register" component={RegisterPage} />
                    <AuthRoute exact path="/update-info" component={RegisterUpdateInfoPage} />
                    <Route exact path="/term-of-use" component={TermOfUsePage} />
                </Switch>
                <ImageModal />
            </Router>
        </div>
    );
}

export default App;
