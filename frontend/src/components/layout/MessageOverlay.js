import React from "react";
import {
    Badge,
    Col,
    Container,
    Image,
    Overlay,
    OverlayTrigger,
    Row,
    Tooltip,
} from "react-bootstrap";
import DefaultAvatar from "../../assets/img/default-avatar.png";
import moment from "moment";
import classNames from "classnames";
import { Link } from "react-router-dom";

function calcTimeDifferenceFromNow(time) {
    const timeConverter = [
        {
            label: "ngày trước",
            ms: 86400000,
            maxValue: 7,
            minValue: 1,
        },
        {
            label: "giờ trước",
            ms: 3600000,
            maxValue: 23,
            minValue: 1,
        },
        {
            label: "phút trước",
            ms: 60000,
            maxValue: 59,
            minValue: 1,
        },
        {
            label: "giây trước",
            ms: 1000,
            maxValue: 59,
            minValue: 0,
        },
    ];
    const now = new Date();
    const _time = new Date(time);
    const timeDifference = now.getTime() - _time.getTime();
    let result = {
        display: "",
        isFitInTimeConverter: false, // if time
    };
    for (let i = 0; i < timeConverter.length; ++i) {
        const _timeValue = Math.floor(timeDifference / timeConverter[i].ms);
        if (_timeValue >= timeConverter[i].minValue && _timeValue <= timeConverter[i].maxValue) {
            result.display = `${_timeValue} ${timeConverter[i].label}`;
            result.isFitInTimeConverter = true;
            break;
        }
    }

    if (!result.isFitInTimeConverter) {
        result.display = moment(_time).format("DD/MM/YYYY");
    }

    return result.display;
}

function UserMessage({ message }) {
    const classes = classNames("mb-3", "pb-3", "pt-3", "user-message", {
        "user-message--unseen": !message.seen,
    });

    return (
        <Row className={classes}>
            <Col md={2} className="text-center">
                <Image src={message.targetUser.avatar} roundedCircle width="50" height="50" />
            </Col>
            <Col md={7}>
                <Row className="mb-1">
                    <Col md={12} className="user-message__user-name text-truncate">
                        <OverlayTrigger
                            placement="top"
                            delay={{ show: 100, hide: 100 }}
                            overlay={
                                <Tooltip>{`${message.targetUser.lastName} ${message.targetUser.firstName}`}</Tooltip>
                            }
                        >
                            <span
                                style={{ fontSize: 20 }}
                                className={`${!message.seen ? "font-weight-bold" : ""}`}
                            >{`${message.targetUser.lastName} ${message.targetUser.firstName}`}</span>
                        </OverlayTrigger>
                        {!message.seen ? (
                            <Badge pill style={{ backgroundColor: "#77aff7" }} className="ml-1">
                                &nbsp;
                            </Badge>
                        ) : (
                            <></>
                        )}
                    </Col>
                </Row>
                <Row className="mt-1">
                    <Col md={12} className="text-truncate user-message__content">
                        {`${message.fromSelf ? "Bạn: " : ""}${message.content}`}
                    </Col>
                </Row>
            </Col>
            <Col md={3} className="align-self-center text-truncate">
                {calcTimeDifferenceFromNow(message.time)}
            </Col>
        </Row>
    );
}

function MessageOverlay({ show, target, marginTop, onClose }) {
    const messageData = [
        {
            targetUser: {
                avatar: DefaultAvatar,
                lastName: "Test",
                firstName: "Name",
            },
            fromSelf: false,
            content: "Lorem ipsum donor",
            time: new Date(2021, 2, 26, 23, 58, 12),
            seen: true,
        },
        {
            targetUser: {
                avatar: DefaultAvatar,
                lastName: "Short",
                firstName: "Name",
            },
            fromSelf: true,
            content: "Yo wassup mdafakaa",
            time: new Date(2021, 2, 27, 9, 6, 18),
            seen: true,
        },
        {
            targetUser: {
                avatar: DefaultAvatar,
                lastName: "This is",
                firstName: "A really long name, will it fit?",
            },
            fromSelf: false,
            content: "This is a super fucking long content",
            time: new Date(2021, 2, 26, 19, 41, 36),
            seen: true,
        },
        {
            targetUser: {
                avatar: DefaultAvatar,
                lastName: "Lorem",
                firstName: "Ipsum",
            },
            fromSelf: false,
            content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
            time: new Date(2021, 2, 26, 23, 58, 12),
            seen: false,
        },
    ];

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
                        {messageData.map((msg, idx) => (
                            <UserMessage message={msg} key={idx} />
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
