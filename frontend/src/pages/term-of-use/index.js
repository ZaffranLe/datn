import React, { useEffect, useState } from "react";
import { Container, Image, Row, Col, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function TermOfUse(props) {

    return (
        <>
            <Container className="d-flex align-items-center full-height" id="term-of-use-page">
                <Row className="full-width">
                    <Col className="text-center term-of-use__container border--round" md={{ span: 8, offset: 2 }}>
                        <Row className="mt-15">
                            <Col md={12}>
                                <h1>Điều khoản sử dụng</h1>
                                <div className="term-of-use__bg">Test</div>
                            </Col>
                        </Row>
                        <Row className="text-left">
                            <Col md={6}>
                                <Link to="/register">
                                    <Button variant="warning">Tiếp tục đăng ký</Button>
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default TermOfUse;
