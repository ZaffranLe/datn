import React, { useEffect, useState } from "react";
import { Container, Image, Row, Col, Button, Form, Overlay, InputGroup } from "react-bootstrap";
import { Transition } from "react-transition-group";
import { Link } from "react-router-dom";
import AppIcon from "../../assets/img/icon.png";

const duration = 300;

const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
};

const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
};

function UpdateInfo(props) {
    const [inProp, setInProp] = useState(false);

    useEffect(() => {
        setInProp(true);
        return () => setInProp(false);
    }, []);

    return (
        <>
            <Transition in={inProp} timeout={duration}>
                {(state) => (
                    <Container
                        style={{
                            ...defaultStyle,
                            ...transitionStyles[state],
                        }}
                        className="d-flex align-items-center full-height"
                        id="register-update-info-page"
                    >
                        <Row className="full-width">
                            <Col className="text-center login-container" md={{ span: 8, offset: 2 }}>
                                <Form>
                                    <Row>
                                        <Col md={12}>
                                            <h4>Bổ sung thông tin cá nhân</h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={4}>
                                            <Row className="full-height pb-15">
                                                <Col md={12} className="full-height">
                                                    <div className="border rounded full-height">Test</div>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col md={8}>
                                            <Row>
                                                <Col md={12}>
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="lastName">
                                                            <Form.Control type="text" placeholder="Họ" />
                                                        </Form.Group>
                                                        <Form.Group as={Col} controlId="firstName">
                                                            <Form.Control type="text" placeholder="Tên" />
                                                        </Form.Group>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="dob">
                                                            <Form.Control type="text" placeholder="Ngày sinh" />
                                                        </Form.Group>
                                                        <Form.Group as={Col} controlId="gender">
                                                            <Form.Control type="text" placeholder="Giới tính" />
                                                        </Form.Group>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="preference">
                                                            <Form.Control type="text" placeholder="--Quan tâm đến--" />
                                                        </Form.Group>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="weight">
                                                            <InputGroup>
                                                                <Form.Control type="text" placeholder="Cân nặng" />
                                                                <InputGroup.Append>
                                                                    <InputGroup.Text>kg</InputGroup.Text>
                                                                </InputGroup.Append>
                                                            </InputGroup>
                                                        </Form.Group>
                                                        <Form.Group as={Col} controlId="height">
                                                            <InputGroup>
                                                                <Form.Control type="text" placeholder="Chiều cao" />
                                                                <InputGroup.Append>
                                                                    <InputGroup.Text>cm</InputGroup.Text>
                                                                </InputGroup.Append>
                                                            </InputGroup>
                                                        </Form.Group>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="city">
                                                            <Form.Control type="text" placeholder="Quê quán" />
                                                        </Form.Group>
                                                    </Form.Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <Form.Group controlId="hobby">
                                                <Form.Control type="text" placeholder="Sở thích" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <Form.Group controlId="bio">
                                                <Form.Control
                                                    as="textarea"
                                                    rows={5}
                                                    placeholder="Giới thiệu về bản thân"
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="mt-15">
                                        <Col md={3} className="text-left">
                                            <Button variant="link">Bỏ qua</Button>
                                        </Col>
                                        <Col md={9} className="text-right">
                                            <Button variant="info">Hoàn tất</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                )}
            </Transition>
        </>
    );
}

export default UpdateInfo;
