import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function AuthLayout(props) {
    return (
        <Container fluid>
            <Row>
                <Col md={{ span: 10, offset: 1 }}>{props.children}</Col>
            </Row>
        </Container>
    );
}

export default AuthLayout;
