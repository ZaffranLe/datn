import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Navbar, Nav, Form, Button, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import AppThumbnail from "../../assets/img/thumbnail.jpg";
import DefaultAvatar from "../../assets/img/default-avatar.png";

function AuthLayout(props) {
    const [marginTop, setMarginTop] = useState(0);

    useEffect(() => {
        const headerHeight = document.getElementById("app-header").clientHeight;
        setMarginTop(headerHeight);
    }, []);

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
                            <Nav.Item as={Link} to="/profile" className="text-white">
                                <Image src={DefaultAvatar} roundedCircle width="40" height="40" />
                                <span className="ml-2">Sơn Tùng</span>
                            </Nav.Item>
                            <Nav.Item>
                                <span className="fa fa-stack fa-lg">
                                    <icon className="fa fa-circle fa-stack-2x text-black-50" />
                                    <icon className="fa fa-comments fa-stack-1x" />
                                </span>
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
