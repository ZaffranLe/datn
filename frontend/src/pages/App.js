import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";
import { history } from "./history";
import jwt from "jsonwebtoken";
// import pages
import LoginPage from "./login";
import ProfilePage from "./profile";
import RegisterPage from "./register";
import RegisterUpdateInfoPage from "./register/update-info";
import TermOfUsePage from "./term-of-use";
import ExplorePage from "./explore";

function AuthRoute({ component: Component, ...rest }) {
    const userInfo = window.userInfo;
    if (!userInfo) {
        const token = localStorage.getItem("token");
        if (!token) {
        } else {
            const payload = jwt.decode(token);
            const exp = new Date(payload.exp * 1000);
            const now = new Date();
            window.userInfo = {
                ...payload,
                exp,
            };
            if (exp < now) {
                localStorage.removeItem("token");
                window.userInfo = undefined;
            }
        }
    }
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
                    <AuthRoute exact path="/profile" component={ProfilePage} />
                    <AuthRoute exact path="/" component={ExplorePage} />
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/register" component={RegisterPage} />
                    <AuthRoute exact path="/register/update-info" component={RegisterUpdateInfoPage} />
                    <Route exact path="/term-of-use" component={TermOfUsePage} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
