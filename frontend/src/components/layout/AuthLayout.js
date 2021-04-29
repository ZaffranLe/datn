import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Image, Navbar, Nav, Form, Button, NavDropdown, Badge, Overlay, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import AppThumbnail from "../../assets/img/thumbnail.jpg";
import DefaultAvatar from "../../assets/img/default-avatar.png";
import MessageOverlay from "./MessageOverlay";
import NotificationOverlay from "./NotificationOverlay";
import SettingOverlay from "./SettingOverlay";
import { getTokenByRefreshToken } from "../../utils/api/common";
import { history } from "../../pages/history";
import jwt from "jsonwebtoken";

function AuthLayout(props) {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
        history.push("/login");
    }

    const userInfo = window.userInfo;
    const token = localStorage.getItem("token");
    if (!token) {
        getTokenByRefreshToken();
    } else if (!userInfo) {
        const payload = jwt.decode(token);
        const exp = new Date(payload.exp * 1000);
        const now = new Date();
        window.userInfo = {
            ...payload,
            exp,
        };
        if (exp < now) {
            getTokenByRefreshToken();
        }
    }

    const [marginTop, setMarginTop] = useState(0);

    useEffect(() => {
        const headerHeight = document.getElementById("app-header").clientHeight;
        setMarginTop(headerHeight);
    }, []);

    // Mock data for notifications
    const notificationData = {
        havingUnseen: true,
        unseenAmount: 7,
    };
    const messageData = {
        havingUnseen: true,
        unseenAmount: 4,
    };

    const notiRef = useRef(null);
    const messageRef = useRef(null);
    const settingRef = useRef(null);
    const [activeMenu, setActiveMenu] = useState(null);

    const handleToggleMenu = (name) => {
        setActiveMenu(activeMenu === name ? null : name);
    };

    return (
        <Container fluid>
            <Row id="app-header" className="bg-facebook--darker fixed-top ml-0 mr-0 pt-2 pb-2" style={{ color: "white" }}>
                <Col md="3">
                    <Navbar>
                        <Nav>
                            <Nav.Item>
                                <Form inline>
                                    <Link to="/">
                                        <Image src={AppThumbnail} roundedCircle width="40" height="40" className="mr-2" />
                                    </Link>
                                    <Form.Control type="text" placeholder="Tìm kiếm" className="fluid" />
                                    <Button variant="outline-info">
                                        <i className="fas fa-search" />
                                    </Button>
                                </Form>
                            </Nav.Item>
                        </Nav>
                    </Navbar>
                </Col>
                <Col md="9">
                    <Navbar>
                        <Nav className="mr-auto">
                            <Nav.Item className="text-white" as={Link} to="/">
                                #Khám phá
                            </Nav.Item>
                        </Nav>
                        <Nav>
                            <Nav.Item as={Link} to="/profile" className="text-white mr-4">
                                <Image src={DefaultAvatar} roundedCircle width="40" height="40" />
                                <span className="ml-2">Sơn Tùng</span>
                            </Nav.Item>
                            <Nav.Item>
                                <div ref={messageRef} className="clickable" onClick={() => handleToggleMenu("message")}>
                                    <span className="fas fa-stack fa-lg">
                                        <i className="fas fa-circle fa-stack-2x text-light" />
                                        <i className="fas fa-comments fa-stack-1x text-dark" />
                                    </span>
                                    {messageData.havingUnseen && (
                                        <Badge style={{ position: "relative", bottom: 10, right: 10 }} variant="danger">
                                            {messageData.unseenAmount}
                                        </Badge>
                                    )}
                                </div>
                                <MessageOverlay show={activeMenu === "message"} target={messageRef.current} marginTop={marginTop} onClose={handleToggleMenu} />
                            </Nav.Item>
                            <Nav.Item>
                                <div ref={notiRef} className="clickable" onClick={() => handleToggleMenu("notification")}>
                                    <span className="fas fa-stack fa-lg">
                                        <i className="fas fa-circle fa-stack-2x text-light" />
                                        <i className="fas fa-bell fa-stack-1x text-dark" />
                                    </span>
                                    {notificationData.havingUnseen && (
                                        <Badge style={{ position: "relative", bottom: 10, right: 10 }} variant="danger">
                                            {notificationData.unseenAmount}
                                        </Badge>
                                    )}
                                </div>
                                <NotificationOverlay show={activeMenu === "notification"} target={notiRef.current} />
                            </Nav.Item>
                            <Nav.Item>
                                <div ref={settingRef} className="clickable" onClick={() => handleToggleMenu("setting")}>
                                    <span className="fas fa-stack fa-lg">
                                        <i className="fas fa-circle fa-stack-2x text-light" />
                                        <i className="fas fa-caret-down fa-stack-1x text-dark" />
                                    </span>
                                </div>
                                <SettingOverlay show={activeMenu === "setting"} target={settingRef.current} marginTop={marginTop} onClose={handleToggleMenu} />
                            </Nav.Item>
                        </Nav>
                    </Navbar>
                </Col>
            </Row>
            <Row style={{ marginTop: marginTop }}>
                <Col md="12">{props.children}</Col>
            </Row>
        </Container>
    );
}

export default AuthLayout;
