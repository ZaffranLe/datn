import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import { getUserInfoFromToken } from "../../../common/common";
import { useState } from "react";

function MessageWithUser({ messageGroups }) {
    const { currentUser: currentMessagingUser, isUserInfoLoading } = useSelector((state) => state.message);

    const [selfInfo, setSelfInfo] = useState({
        avatar: null,
        firstName: "User",
        lastName: "Soulatte",
    });

    useEffect(() => {
        const userInfo = getUserInfoFromToken();
        setSelfInfo(userInfo);
    }, []);

    const dispatch = useDispatch();

    return (
        <>
            <Row className="bg-facebook--dark m-2 p-4 br-10 h-75">
                <Col md={12}>
                    {messageGroups.map((_group, _idx) => (
                        <Row key={_idx}>
                            <Col
                                md={{
                                    span: 6,
                                    offset: _group.fromSelf ? 6 : 0,
                                }}
                            >
                                {_group.messages.map((__msg) => (
                                    <p key={__msg.id}>{__msg.content}</p>
                                ))}
                            </Col>
                        </Row>
                    ))}
                </Col>
            </Row>
        </>
    );
}

export default MessageWithUser;
