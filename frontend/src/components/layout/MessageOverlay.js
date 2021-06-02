import React from "react";
import { Col, Container, Overlay, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import UserMessage from "../user-message";

function MessageOverlay({ show, target, marginTop, onClose }) {
    const { messageList } = useSelector((state) => state.message);

    return (
        <Overlay placement="bottom-end" show={show} target={target}>
            {({ placement, arrowProps, show: _show, popper, ...props }) => (
                <Container
                    {...props}
                    style={{
                        position: "absolute",
                        right: 10,
                        top: marginTop,
                        width: "35vw",
                    }}
                    className="bg-facebook--dark text-light rounded pb-2 pt-4"
                >
                    <Row>
                        <Col md={6}>
                            <h2 className="mb-3">Tin nhắn</h2>
                        </Col>
                        <Col md={6} className="text-right">
                            <i
                                onClick={() => onClose("message")}
                                className="fas fa-times-circle fa-2x clickable"
                            />
                        </Col>
                    </Row>
                    <hr className="bg-light" />
                    <div style={{ maxHeight: "30vh", overflowY: "auto", overflowX: "hidden" }}>
                        {messageList.map((msg, idx) => (
                            <UserMessage msg={msg} key={idx} />
                        ))}
                    </div>
                    <hr className="bg-light" />
                    <Row>
                        <Col md={12} className="text-center">
                            <Link to="/messages" className="text-light">
                                Xem tất cả
                            </Link>
                        </Col>
                    </Row>
                </Container>
            )}
        </Overlay>
    );
}

export default MessageOverlay;
