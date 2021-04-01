import React from "react";
import { Row, Col, Table } from "react-bootstrap";
import moment from "moment";

function Info(props) {
    const info = {
        dob: new Date("1999-12-29"),
        gender: 1,
        preference: 1
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
            text: "Không rõ"
        },
    }

    const PREFERENCES = {
        GAY: {
            value: 1,
            icon: "fa-mars-double",
            text: "Đồng tính"
        },
        STRAIGHT: {
            value: 2,
            icon: "fa-venus-mars",
            text: "Dị tính"
        },
        BISEXUAL: {
            value: 3,
            icon: "fa-mars-stroke-v",
            text: "Song tính",
        },
        UNKNOWN: {
            value: 0,
            icon: "fa-genderless",
            text: "Không rõ"
        }
    }

    const genderKey = Object.keys(GENDERS).find(key => GENDERS[key].value == info.gender);
    const prefKey = Object.keys(PREFERENCES).find(key => PREFERENCES[key].value == info.preference);

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
                            <i className={`fa ${GENDERS[genderKey].icon}`} />
                        </Col>
                        <Col md={5}>
                            {GENDERS[genderKey].text}
                        </Col>
                        <Col md={1} className="text-center align-self-center">
                            <i className={`fa ${PREFERENCES[prefKey].icon}`} />
                        </Col>
                        <Col md={5}>
                            {PREFERENCES[prefKey].text}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default Info;
