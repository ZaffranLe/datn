import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function AuthLayout({ children }) {
    return (
        <Container fluid>
            <Row>
                <Col md={{ span: 10, offset: 1 }}>{children}</Col>
            </Row>
        </Container>
    );
}

export default AuthLayout;
