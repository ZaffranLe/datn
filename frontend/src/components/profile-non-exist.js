import React from "react";
import { Col, Row } from "react-bootstrap";
import { CustomLoader } from ".";

function ProfileNonExist(props) {
    return (
        <>
            <Row className="bg-facebook--darker h-100">
                <Col md={12} className="text-center display--table h-100">
                    <div className="display--table-cell vertical-align-middle">
                        <CustomLoader />
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default ProfileNonExist;
