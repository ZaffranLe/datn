import React from "react";
import { Row, Container, Col, Image } from "react-bootstrap";
import DefaultBanner from "../../assets/img/default-banner.jpg";

function Profile(props) {
    return (
        <>
            <Row>
                <Col md={12} style={{ maxHeight: 400, overflowY: "hidden" }}>
                    <Image src={DefaultBanner} style={{ width: "100%" }} />
                </Col>
            </Row>
        </>
    );
}

export default Profile;
