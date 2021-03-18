import React, { useEffect } from "react";
import { useState } from "react";
import { Container, Image, Row, Col, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import AppIcon from "../../assets/img/icon.png";
import { Transition } from "react-transition-group";

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

function Login(props) {
    const [inProp, setInProp] = useState(false);

    useEffect(() => {
        setInProp(true);
        return () => setInProp(false);
    }, []);

    const handleLogin = () => {};

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
                        id="login-page"
                    >
                        <Row className="full-width">
                            <Col className="text-center login-container border--round" md={{ span: 4, offset: 4 }}>
                                <Row>
                                    <Col md={12}>
                                        <Image src={AppIcon} alt="icon" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <h4>Ngọt ngào cho tâm hồn</h4>
                                    </Col>
                                </Row>
                                <Row className="mt-15">
                                    <Col md={12} className="text-left">
                                        <Form>
                                            <Form.Group controlId="login.email">
                                                <Form.Control type="email" placeholder="Email" />
                                            </Form.Group>
                                            <Form.Group controlId="login.password">
                                                <Form.Control type="password" placeholder="Mật khẩu" />
                                            </Form.Group>
                                            <Button className="btn-login" block onClick={handleLogin}>
                                                Đăng nhập
                                            </Button>
                                            <Row>
                                                <Col md={6}>
                                                    <Link to="/forgot-password">
                                                        <Form.Text className="a-like text-left text-black">
                                                            Quên mật khẩu
                                                        </Form.Text>
                                                    </Link>
                                                </Col>
                                                <Col md={6}>
                                                    <Link to="/register">
                                                        <Form.Text className="a-like text-right text-black">
                                                            Chưa có tài khoản? Đăng ký ngay
                                                        </Form.Text>
                                                    </Link>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                )}
            </Transition>
        </>
    );
}

export default Login;
