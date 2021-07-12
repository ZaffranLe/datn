import React, { useEffect, useMemo } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { AuthLayout, ImageModal } from "../components";
import { SocketContext } from "../context";
import { history } from "./history";
import socketIOClient from "socket.io-client";
import config from "../utils/config/cfg";
// import pages
import LoginPage from "./login";
import ProfilePage from "./profile";
import RegisterPage from "./register";
import RegisterUpdateInfoPage from "./update-info";
import TermOfUsePage from "./term-of-use";
import ExplorePage from "./explore";
import MessagePage from "./message";

function AuthRoute({ component: Component, documentTitle, ...rest }) {
    const token = localStorage.getItem("token");

    const socket = useMemo(() => {
        if (token) {
            return socketIOClient(config[config.environment].originBackend, { query: { token } });
        }
        return null;
    }, [token]);

    useEffect(() => {
        document.title = `Soulatte - ${documentTitle}` || "Soulatte";
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            <Route
                {...rest}
                render={(matchProps) => (
                    <AuthLayout>
                        <Component {...matchProps} />
                    </AuthLayout>
                )}
            />
        </SocketContext.Provider>
    );
}

function App() {
    useEffect(() => {
        document.title = "Soulatte";
    }, []);

    return (
        <div className="app-container bg-img">
            <Router history={history}>
                <Switch>
                    <AuthRoute
                        documentTitle="Trang cá nhân"
                        exact
                        path="/profile/:slug"
                        component={ProfilePage}
                    />
                    <AuthRoute
                        documentTitle="Trang cá nhân"
                        exact
                        path="/profile"
                        component={ProfilePage}
                    />
                    <AuthRoute
                        documentTitle="Tin nhắn"
                        exact
                        path="/messages/:slug"
                        component={MessagePage}
                    />
                    <AuthRoute
                        documentTitle="Tin nhắn"
                        exact
                        path="/messages"
                        component={MessagePage}
                    />
                    <AuthRoute documentTitle="Khám phá" exact path="/" component={ExplorePage} />
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/register" component={RegisterPage} />
                    <AuthRoute
                        documentTitle="Cập nhật thông tin"
                        exact
                        path="/update-info"
                        component={RegisterUpdateInfoPage}
                    />
                    <Route exact path="/term-of-use" component={TermOfUsePage} />
                </Switch>
                <ImageModal />
            </Router>
        </div>
    );
}

export default App;
