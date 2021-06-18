import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Overlay, Row, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import UserMessage from "../user-message";

function MessageOverlay({ show, marginTop, onToggle }) {
    const [messageData, setMessageData] = useState({
        havingUnseen: false,
        unseenAmount: 0,
    });
    const { messageList } = useSelector((state) => state.message);

    useEffect(() => {
        const _messageData = {
            havingUnseen: false,
            unseenAmount: 0,
        };
        messageList.forEach((_msg, _idx) => {
            if (!_msg.isSeen) {
                _messageData.havingUnseen = true;
                _messageData.unseenAmount += 1;
            }
        });
        setMessageData(_messageData);
    }, [messageList]);

    const messageRef = useRef(null);

    return (
        <>
            <div ref={messageRef} className="clickable" onClick={() => onToggle("message")}>
                <span className="fas fa-stack fa-lg">
                    <i className="fas fa-circle fa-stack-2x text-light" />
                    <i className="fas fa-comments fa-stack-1x text-dark" />
                </span>
                {messageData.havingUnseen && (
                    <Badge style={{ position: "relative", bottom: 10, right: 10 }} variant="danger">
                        {messageData.unseenAmount}
                    </Badge>
                )}
            </div>

            <Overlay placement="bottom-end" show={show} target={messageRef.current}>
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
                                    onClick={() => onToggle("message")}
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
        </>
    );
}

export default MessageOverlay;
