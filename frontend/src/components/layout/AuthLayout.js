import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Image, Navbar, Nav, Form, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import AppThumbnail from "../../assets/img/thumbnail.jpg";
import DefaultAvatar from "../../assets/img/default-avatar.png";
import MessageOverlay from "./MessageOverlay";
import NotificationOverlay from "./NotificationOverlay";
import SettingOverlay from "./SettingOverlay";
import { getTokenByRefreshToken } from "../../utils/api/common";
import { appendTokenInfo, getImageUrl, getUserInfoFromToken } from "../../common/common";
import { LazyImage } from "..";

function AuthLayout(props) {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
        window.location.replace("/login");
    }

    let userInfo = getUserInfoFromToken();
    const token = localStorage.getItem("token");
    if (!token) {
        getTokenByRefreshToken();
    } else if (!userInfo) {
        appendTokenInfo(token);
        userInfo = getUserInfoFromToken();
        const now = new Date();
        if (userInfo.exp < now) {
            getTokenByRefreshToken();
        }
    }

    const [paddingTop, setPaddingTop] = useState(0);

    useEffect(() => {
        const headerHeight = document.getElementById("app-header").clientHeight;
        setPaddingTop(headerHeight);
    }, []);

    // Mock data for notifications
    const notificationData = {
        havingUnseen: true,
        unseenAmount: 7,
    };

    const notiRef = useRef(null);
    const settingRef = useRef(null);
    const [activeMenu, setActiveMenu] = useState(null);

    const handleToggleMenu = (name) => {
        setActiveMenu(activeMenu === name ? null : name);
    };

    return (
        <Container fluid className="h-100">
            <Row
                id="app-header"
                className="bg-facebook--darker fixed-top ml-0 mr-0 pt-2 pb-2"
                style={{ color: "white" }}
            >
                <Col md="3">
                    <Navbar>
                        <Nav>
                            <Nav.Item>
                                <Form inline>
                                    <Link to="/">
                                        <Image
                                            src={AppThumbnail}
                                            roundedCircle
                                            width="40"
                                            height="40"
                                            className="mr-2"
                                        />
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
                                <div className="display--flex">
                                    <LazyImage
                                        style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 40,
                                        }}
                                        src={userInfo.avatar ? getImageUrl(userInfo.avatar.fileName) : DefaultAvatar}
                                    />
                                    <div style={{ height: 40 }} className="display--table ml-2">
                                        <span className="display--table-cell vertical-align-middle">
                                            {userInfo.lastName} {userInfo.firstName}
                                        </span>
                                    </div>
                                </div>
                            </Nav.Item>
                            <Nav.Item>
                                <MessageOverlay
                                    show={activeMenu === "message"}
                                    paddingTop={paddingTop}
                                    onToggle={handleToggleMenu}
                                />
                            </Nav.Item>
                            <Nav.Item>
                                <div
                                    ref={notiRef}
                                    className="clickable"
                                    onClick={() => handleToggleMenu("notification")}
                                >
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
                                <SettingOverlay
                                    show={activeMenu === "setting"}
                                    target={settingRef.current}
                                    paddingTop={paddingTop}
                                    onClose={handleToggleMenu}
                                />
                            </Nav.Item>
                        </Nav>
                    </Navbar>
                </Col>
            </Row>
            <Row style={{ paddingTop: paddingTop }} className="h-100vh">
                <Col md="12" className="h-100">{props.children}</Col>
            </Row>
        </Container>
    );
}

export default AuthLayout;
