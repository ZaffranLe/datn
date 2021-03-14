import React, { useEffect, useState } from "react";
import { Container, Image, Row, Col, Button, Form, Overlay } from "react-bootstrap";
import { Link } from "react-router-dom";
import AppIcon from "../../assets/img/icon.png";
import { Transition } from "react-transition-group";
import { useRef } from "react";
import { Tooltip } from "bootstrap";

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

function Register(props) {
    const [inProp, setInProp] = useState(false);
    const [registerInfo, setRegisterInfo] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        passwordMatched: true,
    });

    useEffect(() => {
        setInProp(true);
        return () => setInProp(false);
    }, []);

    const handleChange = (name) => ({ target: { value } }) => {
        setRegisterInfo({
            ...registerInfo,
            [name]: value,
        });
    };

    const handleCheckPassword = () => {
        let _matched = false;
        if (registerInfo["password"] === registerInfo["confirmPassword"]) {
            _matched = true;
        }
        setRegisterInfo({
            ...registerInfo,
            passwordMatched: _matched,
        });
    };

    const confirmPasswordRef = useRef(null);

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
                        id="register-page"
                    >
                        <Row className="full-width">
                            <Col className="text-center login-container" md={{ span: 4, offset: 4 }}>
                                <Row>
                                    <Col md={12}>
                                        <Image src={AppIcon} />
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
                                            <Form.Group controlId="Register.email">
                                                <Form.Control
                                                    type="email"
                                                    placeholder="Email"
                                                    value={registerInfo["email"]}
                                                    onChange={handleChange("email")}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="Register.password">
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Mật khẩu"
                                                    value={registerInfo["password"]}
                                                    onChange={handleChange("password")}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="Register.confirmPassword">
                                                <Form.Control
                                                    ref={confirmPasswordRef}
                                                    type="password"
                                                    placeholder="Xác nhận mật khẩu"
                                                    value={registerInfo["confirmPassword"]}
                                                    onChange={handleChange("confirmPassword")}
                                                    onBlur={handleCheckPassword}
                                                />
                                                <Overlay
                                                    target={confirmPasswordRef.current}
                                                    show={!registerInfo["passwordMatched"]}
                                                    placement="bottom"
                                                >
                                                    <Tooltip>Mật khẩu không trùng khớp!</Tooltip>
                                                </Overlay>
                                            </Form.Group>
                                            <Button className="btn-register" block>
                                                Đăng ký
                                            </Button>
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

export default Register;
