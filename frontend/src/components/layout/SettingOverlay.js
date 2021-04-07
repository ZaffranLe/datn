import React from "react";
import { Overlay, Container, Row, Col, Image } from "react-bootstrap";
import DefaultAvatar from "../../assets/img/default-avatar.png";

function SettingOverlay({ show, target, marginTop, onClose }) {
    return (
        <Overlay placement="bottom-end" show={show} target={target}>
            {({ placement, arrowProps, show: _show, popper, ...props }) => (
                <Container
                    {...props}
                    style={{
                        position: "absolute",
                        right: 10,
                        top: marginTop,
                        width: "30vw",
                        maxHeight: "60vh",
                        overflowY: "auto",
                    }}
                    className="bg-facebook--dark text-light rounded pb-2 pt-4"
                >
                    <Row>
                        <Col md={6}>
                            <h2 className="mb-3">Tuỳ chỉnh</h2>
                        </Col>
                        <Col md={6} className="text-right">
                            <i
                                onClick={() => onClose("setting")}
                                className="fa fa-times-circle fa-2x clickable"
                            />
                        </Col>
                    </Row>
                    <hr className="bg-light" />
                    <Row className="mb-3 pb-3 pt-3 notification-item">
                        <Col md={12}>
                            <Row>
                                <Col md={2}>
                                    <Image
                                        src={DefaultAvatar}
                                        width={60}
                                        height={60}
                                        roundedCircle
                                    />
                                </Col>
                                <Col md={10} className="align-self-center">
                                    <Row>
                                        <Col md={12}>
                                            <h4>Sơn Tùng</h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>Xem trang cá nhân của bạn</Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mb-3 pb-3 pt-3 notification-item" style={{ fontSize: 20 }}>
                        <Col md={2} className="text-center">
                            <span className="fa fa-stack fa-lg">
                                <i className="fa fa-circle fa-stack-2x text-black-50" />
                                <i className="fa fa-sign-out fa-stack-1x" />
                            </span>
                        </Col>
                        <Col md={10} className="align-self-center">
                            <span>Đăng xuất</span>
                        </Col>
                    </Row>
                </Container>
            )}
        </Overlay>
    );
}

export default SettingOverlay;
