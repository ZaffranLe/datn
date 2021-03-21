import React, { useEffect, useState } from "react";
import { Container, Image, Row, Col, Button, Form, ProgressBar, Tooltip, Overlay } from "react-bootstrap";
import AppIcon from "../../assets/img/icon.png";
import { Transition } from "react-transition-group";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateRegisterInfo, updateRegisterInfoValidation } from "./slice";
import { duration, defaultStyle, transitionStyles } from "../../common/transition-style";
import produce from "immer";

function Register(props) {
    const [inProp, setInProp] = useState(false);
    const {
        registerInfo,
        registerInfo: { email, password, confirmPassword, agreeTerm },
        registerInfoValidation,
        registerInfoValidation: { isEmailValid, isPasswordMatched, isValid, passwordStrength },
    } = useSelector((state) => state.register);
    const dispatch = useDispatch();

    const [isFocusingPassword, setIsFocusingPassword] = useState(false);
    const [isFocusingEmail, setIsFocusingEmail] = useState(false);

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
        });
        dispatch(updateRegisterInfoValidation(_registerInfoValidation));
        setIsFocusingPassword(false);
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
        const _registerInfoValidation = produce(registerInfoValidation, (draft) => {});
        dispatch(updateRegisterInfoValidation(_registerInfoValidation));
        setIsFocusingPassword(true);
    };

    const handleFocusEmail = () => {
        setIsFocusingEmail(true);
    };

    const handleChangePassword = ({ target: { value } }) => {
        let _passwordStrength = {
            value: 0,
            isLengthPassed: false,
            isSpecialCharIncluded: false,
            isUpperCaseIncluded: false,
            isNumberIncluded: false,
        };
        const _passwordLengthReg = /(?=.{8,})/;
        const _specialCharReg = /(?=.*[!@#$%^&*])/;
        const _numberReg = /(?=.*[0-9])/;
        const _upperCaseReg = /(?=.*[A-Z])/;
        if (_passwordLengthReg.test(value)) {
            _passwordStrength.isLengthPassed = true;
            _passwordStrength.value += 25;
        }
        if (_specialCharReg.test(value)) {
            _passwordStrength.isSpecialCharIncluded = true;
            if (_passwordStrength.isLengthPassed) {
                _passwordStrength.value += 25;
            }
        }
        if (_numberReg.test(value)) {
            _passwordStrength.isNumberIncluded = true;
            if (_passwordStrength.isLengthPassed) {
                _passwordStrength.value += 25;
            }
        }
        if (_upperCaseReg.test(value)) {
            _passwordStrength.isUpperCaseIncluded = true;
            if (_passwordStrength.isLengthPassed) {
                _passwordStrength.value += 25;
            }
        }
        const _registerInfo = produce(registerInfo, (draft) => {
            draft["password"] = value;
        });
        dispatch(updateRegisterInfo(_registerInfo));
        const _registerInfoValidation = produce(registerInfoValidation, (draft) => {
            draft["passwordStrength"] = _passwordStrength;
            draft["isValid"] =
                _passwordStrength.isLengthPassed &&
                isEmailValid &&
                isPasswordMatched &&
                agreeTerm &&
                _passwordStrength.value >= 75
                    ? true
                    : false;
        });
        dispatch(updateRegisterInfoValidation(_registerInfoValidation));
    };

    const passwordRef = useRef(null);

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
                                                    ref={passwordRef}
                                                    type="password"
                                                    placeholder="Mật khẩu"
                                                    value={password}
                                                    onChange={handleChangePassword}
                                                    onBlur={handleCheckPassword}
                                                    onFocus={handleFocusPassword}
                                                />
                                                <Overlay
                                                    target={passwordRef.current}
                                                    placement="top"
                                                    show={isFocusingPassword}
                                                >
                                                    <Tooltip id="password-tooltip">
                                                        <div className="text-left">
                                                            <span>
                                                                - Tối thiểu 8 ký tự{" "}
                                                                <i
                                                                    className={`fa ${
                                                                        passwordStrength.isLengthPassed
                                                                            ? "fa-check text-success"
                                                                            : "fa-times text-danger"
                                                                    }`}
                                                                    aria-hidden="true"
                                                                />
                                                            </span>
                                                            <br />
                                                            <span>
                                                                - Có ký tự đặc biệt{" "}
                                                                <i
                                                                    className={`fa ${
                                                                        passwordStrength.isSpecialCharIncluded
                                                                            ? "fa-check text-success"
                                                                            : "fa-times text-danger"
                                                                    }`}
                                                                    aria-hidden="true"
                                                                />
                                                            </span>
                                                            <br />
                                                            <span>
                                                                - Có ký tự là số{" "}
                                                                <i
                                                                    className={`fa ${
                                                                        passwordStrength.isNumberIncluded
                                                                            ? "fa-check text-success"
                                                                            : "fa-times text-danger"
                                                                    }`}
                                                                    aria-hidden="true"
                                                                />
                                                            </span>
                                                            <br />
                                                            <span>
                                                                - Có ký tự in hoa{" "}
                                                                <i
                                                                    className={`fa ${
                                                                        passwordStrength.isUpperCaseIncluded
                                                                            ? "fa-check text-success"
                                                                            : "fa-times text-danger"
                                                                    }`}
                                                                    aria-hidden="true"
                                                                />
                                                            </span>
                                                        </div>
                                                    </Tooltip>
                                                </Overlay>
                                                {password && (
                                                    <>
                                                        <Form.Text>Độ mạnh của mật khẩu</Form.Text>
                                                        <Form.Text>
                                                            <ProgressBar now={passwordStrength.value} />
                                                        </Form.Text>
                                                    </>
                                                )}
                                            </Form.Group>
                                            <Form.Group controlId="register.confirmPassword">
                                                <Form.Control
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
                                                    onChange={handleCheckTos}
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
