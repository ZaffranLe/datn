import React, { useEffect, useRef, useState } from "react";
import {
    Container,
    Row,
    Col,
    Image,
    Navbar,
    Nav,
    Form,
    Button,
    NavDropdown,
    Badge,
    Overlay,
    Dropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import AppThumbnail from "../../assets/img/thumbnail.jpg";
import DefaultAvatar from "../../assets/img/default-avatar.png";
import MessageOverlay from "./MessageOverlay";
import NotificationOverlay from "./NotificationOverlay";
import SettingOverlay from "./SettingOverlay";

function AuthLayout(props) {
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
    const [showNotiOverlay, setShowNotiOverlay] = useState(false);

    const messageRef = useRef(null);
    const [showMessageOverlay, setShowMessageOverlay] = useState(false);

    const settingRef = useRef(null);
    const [showSettingOverlay, setShowSettingOverlay] = useState(false);

    return (
        <Container fluid>
            <Row id="app-header" className="bg-dark fixed-top ml-0 mr-0 pt-2 pb-2" style={{ color: "white" }}>
                <Col md="3">
                    <Navbar>
                        <Nav>
                            <Nav.Item>
                                <Form inline>
                                    <Link to="/explore">
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
                                        <i className="fa fa-search" />
                                    </Button>
                                </Form>
                            </Nav.Item>
                        </Nav>
                    </Navbar>
                </Col>
                <Col md="9">
                    <Navbar>
                        <Nav className="mr-auto">
                            <Nav.Item className="text-white" as={Link} to="/explore">
                                #Khám phá
                            </Nav.Item>
                        </Nav>
                        <Nav>
                            <Nav.Item as={Link} to="/profile" className="text-white mr-4">
                                <Image src={DefaultAvatar} roundedCircle width="40" height="40" />
                                <span className="ml-2">Sơn Tùng</span>
                            </Nav.Item>
                            <Nav.Item>
                                <div
                                    ref={messageRef}
                                    className="a-like"
                                    onClick={() => setShowMessageOverlay(!showMessageOverlay)}
                                >
                                    <span className="fa fa-stack fa-lg">
                                        <i className="fa fa-circle fa-stack-2x text-black-50" />
                                        <i className="fa fa-comments fa-stack-1x" />
                                    </span>
                                    {messageData.havingUnseen && (
                                        <Badge style={{ position: "relative", bottom: 10, right: 10 }} variant="danger">
                                            {messageData.unseenAmount}
                                        </Badge>
                                    )}
                                </div>
                                <MessageOverlay
                                    show={showMessageOverlay}
                                    target={messageRef.current}
                                    marginTop={marginTop}
                                />
                            </Nav.Item>
                            <Nav.Item>
                                <div
                                    ref={notiRef}
                                    className="a-like"
                                    onClick={() => setShowNotiOverlay(!showNotiOverlay)}
                                >
                                    <span className="fa fa-stack fa-lg">
                                        <i className="fa fa-circle fa-stack-2x text-black-50" />
                                        <i className="fa fa-bell fa-stack-1x" />
                                    </span>
                                    {notificationData.havingUnseen && (
                                        <Badge style={{ position: "relative", bottom: 10, right: 10 }} variant="danger">
                                            {notificationData.unseenAmount}
                                        </Badge>
                                    )}
                                </div>
                                <NotificationOverlay show={showNotiOverlay} target={notiRef.current} />
                            </Nav.Item>
                            <Nav.Item>
                                <div
                                    ref={settingRef}
                                    className="a-like"
                                    onClick={() => setShowSettingOverlay(!showSettingOverlay)}
                                >
                                    <span className="fa fa-stack fa-lg">
                                        <i className="fa fa-circle fa-stack-2x text-black-50" />
                                        <i className="fa fa-caret-down fa-stack-1x" />
                                    </span>
                                </div>
                                <SettingOverlay show={showSettingOverlay} target={settingRef.current} />
                            </Nav.Item>
                        </Nav>
                    </Navbar>
                </Col>
            </Row>
            <Row className="justify-content-center" style={{ marginTop: marginTop }}>
                <Col md="11" className="bg-white">
                    {props.children}
                </Col>
            </Row>
        </Container>
    );
}

export default AuthLayout;
