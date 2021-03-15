import React, { useEffect, useState } from "react";
import { Container, Image, Row, Col, Button, Form } from "react-bootstrap";
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

function TermOfUse(props) {
    const [inProp, setInProp] = useState(false);

    useEffect(() => {
        setInProp(true);
        return setInProp(false);
    }, []);

    return (
        <>
            <Container className="d-flex align-items-center full-height" id="term-of-use-page">
                <Row className="full-width">
                    <Col className="text-center term-of-use__container" md={{ span: 8, offset: 2 }}>
                        <Row>
                            <Col md={12}>
                                <Image src={AppIcon} />
                            </Col>
                        </Row>
                        <Row className="mt-15">
                            <Col md={12}>
                                <h1>Điều khoản sử dụng</h1>
                                <div
                                    className="term-of-use__bg"
                                >
                                    Test
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default TermOfUse;
