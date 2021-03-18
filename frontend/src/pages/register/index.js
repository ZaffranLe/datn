import React, { useEffect, useState } from "react";
import { Container, Image, Row, Col, Button, Form, ProgressBar } from "react-bootstrap";
import AppIcon from "../../assets/img/icon.png";
import { Transition } from "react-transition-group";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateRegisterInfo, updateRegisterInfoValidation } from "./slice";
import produce from "immer";

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
    const {
        registerInfo,
        registerInfo: { email, password, confirmPassword, agreeTerm },
        registerInfoValidation,
        registerInfoValidation: {
            isEmailValid,
            isPasswordMatched,
            isValid,
            isFocusingEmail,
            isFocusingPassword,
            passwordStrength,
        },
    } = useSelector((state) => state.register);
    const dispatch = useDispatch();

    useEffect(() => {
        setInProp(true);
        return () => setInProp(false);
    }, []);

    useEffect(() => {
        let _isValid = false;
        if (isEmailValid && isPasswordMatched && email && password && agreeTerm) {
            _isValid = true;
        }
        const _registerInfoValidation = produce(registerInfoValidation, (draft) => {
            draft.isValid = _isValid;
        });
        dispatch(updateRegisterInfoValidation(_registerInfoValidation));
    }, [isEmailValid, isPasswordMatched, agreeTerm]);

    const handleChange = (name) => ({ target: { value } }) => {
        const _registerInfo = produce(registerInfo, (draft) => {
            draft[name] = value;
        });
        dispatch(updateRegisterInfo(_registerInfo));
    };

    const handleCheckPassword = () => {
        let _isMatched = false;
        if (password === confirmPassword) {
            _isMatched = true;
        }
        const _registerInfoValidation = produce(registerInfoValidation, (draft) => {
            draft["isPasswordMatched"] = _isMatched;
            draft["isFocusingPassword"] = false;
        });
        dispatch(updateRegisterInfoValidation(_registerInfoValidation));
    };

    const handleCheckEmail = () => {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const _isValid = emailRegex.test(String(email).toLowerCase());
        const _registerInfoValidation = produce(registerInfoValidation, (draft) => {
            draft["isEmailValid"] = _isValid;
        });
        dispatch(updateRegisterInfoValidation(_registerInfoValidation));
    };

    const handleCheckTos = (e) => {
        const _registerInfo = produce(registerInfo, (draft) => {
            draft["agreeTerm"] = e.target.checked;
        });
        dispatch(updateRegisterInfo(_registerInfo));
    };

    const handleFocusPassword = () => {
        const _registerInfoValidation = produce(registerInfoValidation, (draft) => {
            draft["isFocusingPassword"] = true;
        });
        dispatch(updateRegisterInfoValidation(_registerInfoValidation));
    };

    const handleFocusEmail = () => {
        const _registerInfoValidation = produce(registerInfoValidation, (draft) => {
            draft["isFocusingEmail"] = true;
        });
        dispatch(updateRegisterInfoValidation(_registerInfoValidation));
    };

    const handleChangePassword = ({ target: { value } }) => {
        const _registerInfo = produce(registerInfo, (draft) => {
            draft["password"] = value;
        });
        dispatch(updateRegisterInfo(_registerInfo));
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
                            <Col className="text-center login-container border--round" md={{ span: 4, offset: 4 }}>
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
                                            <Form.Group controlId="register.email">
                                                <Form.Control
                                                    type="email"
                                                    placeholder="Email"
                                                    value={email}
                                                    onChange={handleChange("email")}
                                                    onBlur={handleCheckEmail}
                                                    onFocus={handleFocusEmail}
                                                />
                                                {!isEmailValid && !isFocusingEmail && (
                                                    <Form.Text className="text-error">Email không hợp lệ!</Form.Text>
                                                )}
                                            </Form.Group>
                                            <Form.Group controlId="register.password">
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Mật khẩu"
                                                    value={password}
                                                    onChange={handleChangePassword}
                                                    onBlur={handleCheckPassword}
                                                    onFocus={handleFocusPassword}
                                                />
                                                {password && (
                                                    <>
                                                        <Form.Text>Độ mạnh của mật khẩu</Form.Text>
                                                        <Form.Text>
                                                            <ProgressBar now={passwordStrength} />
                                                        </Form.Text>
                                                    </>
                                                )}
                                            </Form.Group>
                                            <Form.Group controlId="register.confirmPassword">
                                                <Form.Control
                                                    ref={confirmPasswordRef}
                                                    type="password"
                                                    placeholder="Xác nhận mật khẩu"
                                                    value={confirmPassword}
                                                    onChange={handleChange("confirmPassword")}
                                                    onBlur={handleCheckPassword}
                                                    onFocus={handleFocusPassword}
                                                />
                                                {!isPasswordMatched && !isFocusingPassword && (
                                                    <Form.Text className="text-error">
                                                        Mật khẩu không trùng khớp!
                                                    </Form.Text>
                                                )}
                                            </Form.Group>
                                            <Form.Group controlId="register.agreeTerm">
                                                <Form.Check
                                                    type="checkbox"
                                                    checked={agreeTerm}
                                                    onClick={handleCheckTos}
                                                    label={<Link to="/term-of-use">Điều khoản sử dụng</Link>}
                                                />
                                            </Form.Group>
                                            <Link to="/register/update-info">
                                                <Button className="btn-register" block disabled={!isValid}>
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
