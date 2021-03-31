import React from "react";
import { Row, Col, Table } from "react-bootstrap";
import moment from "moment";

function Info(props) {
    const info = {
        dob: new Date("1999-12-29"),
        gender: 1,
    };

    const GENDERS = {
        MALE: {
            value: 1,
            icon: "fa-mars",
            text: "Nam"
        },
        FEMALE: {
            value: 0,
            icon: "fa-venus",
            text: "Nữ"
        },
        UNKNOWN: {
            value: 2,
            icon: "fa-genderless",
            text: "Nữ"
        },
    }

    return (
        <>
            <Row className="p-3 profile__info">
                <Col md={12}>
                    <span className="h4">Giới thiệu</span>
                    <Row>
                        <Col md={1} className="text-center">
                            <i className="fa fa-birthday-cake" />
                        </Col>
                        <Col md={11}>{moment(info.dob).format("DD-MM-YYYY")}</Col>
                    </Row>
                    <Row>
                        <Col md={1} className="text-center align-self-center">
                            <i className={`fa ${gender ? "fa-mars" : "fa-venus"}`} />
                        </Col>
                        <Col md={11}>
                            This is a fucking long text. This is a fucking long text. This is a fucking long text. This
                            is a fucking long text.
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default Info;
