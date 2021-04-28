import React, { useEffect } from "react";
import { useState } from "react";
import { Container, Image, Row, Col, Button, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import AppIcon from "../../assets/img/icon.png";
import { Transition } from "react-transition-group";
import { duration, defaultStyle, transitionStyles } from "../../common/transition-style";
import { useDispatch, useSelector } from "react-redux";
import * as loginActions from "./slice";

function Login(props) {
    const [inProp, setInProp] = useState(false);
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: "",
    });

    const { email, password } = loginInfo;

    const { isLoading, errorMsg } = useSelector((state) => state.login);
    const dispatch = useDispatch();

    useEffect(() => {
        setInProp(true);
        return () => setInProp(false);
    }, []);

    const handleChange = (name) => (e) => {
        setLoginInfo({
            ...loginInfo,
            [name]: e.target.value,
        });
    };

    const handleLogin = () => {
        dispatch(loginActions.login(email, password));
    };

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
                            <Col
                                className="text-center login-container border--round"
                                md={{ span: 4, offset: 4 }}
                            >
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
                                {errorMsg && (
                                    <Row className="mt-15">
                                        <Col md={12}>
                                            <Alert variant="danger">{errorMsg}</Alert>
                                        </Col>
                                    </Row>
                                )}
                                <Row className={`${!errorMsg && "mt-15"}`}>
                                    <Col md={12} className="text-left">
                                        <Form>
                                            <Form.Group controlId="login.email">
                                                <Form.Control
                                                    type="email"
                                                    placeholder="Email"
                                                    value={email}
                                                    onChange={handleChange("email")}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="login.password">
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Mật khẩu"
                                                    value={password}
                                                    onChange={handleChange("password")}
                                                />
                                            </Form.Group>
                                            <Button
                                                className="btn-login"
                                                block
                                                onClick={handleLogin}
                                                disabled={isLoading}
                                                type="submit"
                                            >
                                                {isLoading && (
                                                    <i className="fas fa-spinner fa-pulse" />
                                                )}{" "}
                                                Đăng nhập
                                            </Button>
                                            <Row>
                                                <Col md={6}>
                                                    <Link to="/forgot-password">
                                                        <Form.Text className="clickable__text text-left text-black">
                                                            Quên mật khẩu
                                                        </Form.Text>
                                                    </Link>
                                                </Col>
                                                <Col md={6}>
                                                    <Link to="/register">
                                                        <Form.Text className="clickable__text text-right text-black">
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
