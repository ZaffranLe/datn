import React from "react";
import { Row, Col, Table, Badge } from "react-bootstrap";
import moment from "moment";

function Info(props) {
    const info = {
        dob: new Date("1999-12-29"),
        gender: 1,
        preference: 1,
        height: 186,
        weight: 80,
        homeTown: "Hà Nội",
        hobbies: [
            {
                key: 0,
                label: "Đọc sách",
                icon: "fa-book",
                value: 0,
            },
            {
                key: 1,
                label: "Chơi game",
                icon: "fa-gamepad",
                value: 1,
            },
            {
                key: 2,
                label: "Ăn uống",
                icon: "fa-cutlery",
                value: 2,
            },
        ],
    };

    const GENDERS = {
        MALE: {
            value: 1,
            icon: "fa-mars",
            text: "Nam",
        },
        FEMALE: {
            value: 0,
            icon: "fa-venus",
            text: "Nữ",
        },
        UNKNOWN: {
            value: 2,
            icon: "fa-genderless",
            text: "Không rõ",
        },
    };

    const PREFERENCES = {
        GAY: {
            value: 1,
            icon: "fa-mars-double",
            text: "Đồng tính",
        },
        STRAIGHT: {
            value: 2,
            icon: "fa-venus-mars",
            text: "Dị tính",
        },
        BISEXUAL: {
            value: 3,
            icon: "fa-mars-stroke-v",
            text: "Song tính",
        },
        UNKNOWN: {
            value: 0,
            icon: "fa-genderless",
            text: "Không rõ",
        },
    };

    const genderKey = Object.keys(GENDERS).find((key) => GENDERS[key].value == info.gender);
    const prefKey = Object.keys(PREFERENCES).find((key) => PREFERENCES[key].value == info.preference);

    return (
        <>
            <Row className="justify-content-center pr-2">
                <Col md={12} className="bg-secondary" style={{ borderRadius: 10 }}>
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
                                <Col md={5}>{GENDERS[genderKey].text}</Col>
                                <Col md={1} className="text-center align-self-center">
                                    <i className={`fa ${PREFERENCES[prefKey].icon}`} />
                                </Col>
                                <Col md={5}>{PREFERENCES[prefKey].text}</Col>
                            </Row>
                            <Row>
                                <Col md={1} className="text-center">
                                    <i className="fa fa-home" />
                                </Col>
                                <Col md={11}>{info.homeTown}</Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    Cao: {info.height}cm
                                </Col>
                                <Col md={6}>
                                    Nặng: {info.weight}kg
                                </Col>
                            </Row>
                            <span className="h4">Sở thích</span>
                            <Row>
                                <Col md={12}>
                                    {info.hobbies.map((hobby, idx) => (
                                        <div key={hobby.value} className="profile__hobby">
                                            <i className={`fa ${hobby.icon}`} /> {hobby.label}
                                        </div>
                                    ))}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default Info;
