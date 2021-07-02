import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import { getImageUrl, getUserInfoFromToken } from "../../../common/common";
import { useState } from "react";
import { LazyImage } from "../../../components";
import DefaultAvatar from "../../../assets/img/default-avatar.png";
import Skeleton from "react-loading-skeleton";

function MessageWithUser({ messageGroups }) {
    const { currentUser, isUserInfoLoading } = useSelector((state) => state.message);

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
            <Row className="bg-facebook--dark m-2 p-4 br-10 h-85 overflow-auto">
                <Col md={12}>
                    <Row>
                        <Col md={12}>
                            {isUserInfoLoading ? (
                                <>
                                    <Skeleton count={1} />
                                </>
                            ) : (
                                currentUser && (
                                    <div className="display--flex pb-4 mb-3 border-bottom">
                                        <LazyImage
                                            style={{
                                                width: 60,
                                                height: 60,
                                                borderRadius: 60,
                                            }}
                                            src={currentUser.avatar ? getImageUrl(currentUser.avatar) : DefaultAvatar}
                                        />
                                        <div style={{ height: 60 }} className="display--table ml-2">
                                            <span className="display--table-cell vertical-align-middle">
                                                <big>
                                                    {currentUser.lastName} {currentUser.firstName}
                                                </big>
                                            </span>
                                        </div>
                                    </div>
                                )
                            )}
                        </Col>
                    </Row>
                    <Row className="h-100">
                        <Col md={12} className="h-100">
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
                </Col>
            </Row>
        </>
    );
}

export default MessageWithUser;
