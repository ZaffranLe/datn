import React, { useEffect, useState } from "react";
import { Container, Image, Row, Col, Button, Form } from "react-bootstrap";
import AppIcon from "../../assets/img/icon.png";
import { Transition } from "react-transition-group";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateRegisterInfo } from "./slice";

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
    const { registerInfo } = useSelector((state) => state.register);
    const dispatch = useDispatch();

    useEffect(() => {
        setInProp(true);
        return () => setInProp(false);
    }, []);

    const handleChange = (name) => ({ target: { value } }) => {
        dispatch(updateRegisterInfo({ name, value }));
    };

    const handleCheckPassword = () => {
        let _matched = false;
        if (registerInfo["password"] === registerInfo["confirmPassword"]) {
            _matched = true;
        }
        dispatch(updateRegisterInfo({ name: "passwordMatched", value: _matched }));
    };

    const handleCheckTos = (e) => {
        dispatch(updateRegisterInfo({ name: "agreeTerm", value: e.target.checked }));
    };

    const handleFocusPassword = () => {
        dispatch(updateRegisterInfo({ name: "passwordMatched", value: true }));
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
                                                    onBlur={handleCheckPassword}
                                                    onFocus={handleFocusPassword}
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
                                                    onFocus={handleFocusPassword}
                                                />
                                                {!registerInfo["passwordMatched"] && (
                                                    <Form.Text className="text-error">
                                                        Mật khẩu không trùng khớp!
                                                    </Form.Text>
                                                )}
                                            </Form.Group>
                                            <Form.Group controlId="Register.agreeTerm">
                                                <Form.Check
                                                    type="checkbox"
                                                    checked={registerInfo["agreeTerm"]}
                                                    onClick={handleCheckTos}
                                                    label={<Link to="/term-of-use">Điều khoản sử dụng</Link>}
                                                />
                                            </Form.Group>
                                            <Link to="/register/update-info">
                                                <Button
                                                    className="btn-register"
                                                    block
                                                    disabled={!registerInfo["agreeTerm"]}
                                                >
                                                    Đăng ký
                                                </Button>
                                            </Link>
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
