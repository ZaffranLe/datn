import React from "react";
import { Badge, Col, Container, Image, Overlay, Row } from "react-bootstrap";
import DefaultAvatar from "../../assets/img/default-avatar.png";
import DefaultAvatar2 from "../../assets/img/default-avatar-2.jpg";
import DefaultAvatar3 from "../../assets/img/default-avatar-3.jpg";
import DefaultAvatar4 from "../../assets/img/default-avatar-4.jpg";
import "./style.scss";
import moment from "moment";
import classNames from "classnames";

function calcTimeDifferenceFromNow(time) {
    const timeConverter = [
        {
            label: "ngày trước",
            ms: 86400000,
            maxValue: 7,
        },
        {
            label: "giờ trước",
            ms: 3600000,
            maxValue: 23,
        },
        {
            label: "phút trước",
            ms: 60000,
            maxValue: 59,
        },
        {
            label: "giây trước",
            ms: 1000,
            maxValue: 59,
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
        if (_timeValue > 0 && _timeValue <= timeConverter[i].maxValue) {
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
                    <Col md={12} className="user-message__user-name">
                        <span
                            style={{ fontSize: 20 }}
                            className={`${!message.seen ? "font-weight-bold" : ""}`}
                        >{`${message.targetUser.lastName} ${message.targetUser.firstName}`}</span>{" "}
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

function MessageOverlay({ show, target, marginTop }) {
    const messageData = [
        {
            targetUser: {
                avatar: DefaultAvatar3,
                lastName: "Bắp",
                firstName: "iu",
            },
            fromSelf: false,
            content: "c ngủ ngon nè <3",
            time: new Date(2021, 2, 26, 23, 58, 12),
            seen: true,
        },
        {
            targetUser: {
                avatar: DefaultAvatar2,
                lastName: "Nguyễn",
                firstName: "Huỳnh Nguyên",
            },
            fromSelf: true,
            content: "miễn sao ngồi với bồ á",
            time: new Date(2021, 2, 27, 9, 6, 18),
            seen: true,
        },
        {
            targetUser: {
                avatar: DefaultAvatar4,
                lastName: "Lê",
                firstName: "Thiên Phú",
            },
            fromSelf: false,
            content: "Dạ em cảm ơn anh nha ^^",
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
                        width: "30vw",
                        maxHeight: "60vh",
                        overflowY: "auto",
                    }}
                    className="bg-secondary text-light rounded pb-2 pt-2"
                >
                    <h2 className="mb-3">Tin nhắn</h2>
                    <hr className="bg-light" />
                    {messageData.map((msg, idx) => (
                        <UserMessage message={msg} key={idx} />
                    ))}
                </Container>
            )}
        </Overlay>
    );
}

export default MessageOverlay;
