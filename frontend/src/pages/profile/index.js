import React from "react";
import { Row, Container, Col } from "react-bootstrap";

function Profile(props) {
    return (
        <>
            <Container fluid>
                <Row>
                    <Col md={{ span: 10, offset: 1 }}>Test</Col>
                </Row>
            </Container>
        </>
    );
}

export default Profile;
