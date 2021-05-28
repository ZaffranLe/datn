import React from "react";
import { Row, Col } from "react-bootstrap";
import moment from "moment";

function Info({ user, handleShowUserList }) {
    return (
        <>
            {user && (
                <Row
                    style={{ position: "sticky", top: 100 }}
                    className="justify-content-center pr-2"
                >
                    <Col md={12} className="bg-facebook--dark br-10">
                        <Row className="p-3 profile__info">
                            <Col md={12}>
                                <span className="h4">
                                    <b>Giới thiệu</b>
                                </span>
                                <Row>
                                    <Col md={3} className="align-self-center">
                                        Giới tính:
                                    </Col>
                                    <Col md={9}>
                                        {user.gender.name} <i className={`${user.gender.icon}`} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={3} className="align-self-center">
                                        Xu hướng:
                                    </Col>
                                    <Col md={9}>
                                        {user.preference.name}{" "}
                                        <i className={`${user.preference.icon}`} />
                                    </Col>
                                </Row>
                                <Row>
                                    {user.height && <Col md={6}>Cao: {user.height}cm</Col>}
                                    {user.weight && <Col md={6}>Nặng: {user.weight}kg</Col>}
                                </Row>
                                <Row>
                                    {user.dob && (
                                        <>
                                            <Col md={1} className="text-center">
                                                <i className="fas fa-birthday-cake" />
                                            </Col>
                                            <Col md={5}>
                                                {moment(user.dob).format("DD-MM-YYYY")}
                                            </Col>
                                        </>
                                    )}
                                    {user.provinceName && (
                                        <>
                                            <Col md={1} className="text-center">
                                                <i className="fas fa-home" />
                                            </Col>
                                            <Col md={5}>{user.provinceName}</Col>
                                        </>
                                    )}
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <span
                                            className="clickable"
                                            onClick={() => handleShowUserList(user.following)}
                                        >
                                            Đang theo dõi{" "}
                                            <b>
                                                <u>{user.following.length}</u>
                                            </b>{" "}
                                            người
                                        </span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <span
                                            className="clickable"
                                            onClick={() => handleShowUserList(user.followed)}
                                        >
                                            Có{" "}
                                            <b>
                                                <u>{user.followed.length}</u>
                                            </b>{" "}
                                            người theo dõi
                                        </span>
                                    </Col>
                                </Row>
                                <span className="h4">
                                    <b>Sở thích</b>
                                </span>
                                {user.hobbies.length > 0 ? (
                                    <Row>
                                        <Col md={12}>
                                            {user.hobbies.map((hobby, idx) => (
                                                <div key={idx} className="profile__hobby">
                                                    <i className={`${hobby.icon}`} /> {hobby.name}
                                                </div>
                                            ))}
                                        </Col>
                                    </Row>
                                ) : (
                                    <p>- Hiện người dùng này chưa có sở thích nào</p>
                                )}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            )}
        </>
    );
}

export default Info;
