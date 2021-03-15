import React, { useEffect, useState } from "react";
import { Container, Image, Row, Col, Button, Form, Overlay } from "react-bootstrap";
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
                            <Col
                                className="text-center login-container"
                                md={{ span: 4, offset: 4 }}
                            >
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
                                            <Link to="/">
                                                <Button className="btn-register" block>
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

export default UpdateInfo;
