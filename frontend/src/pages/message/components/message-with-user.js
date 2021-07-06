import { useSelector, useDispatch } from "react-redux";
import { Row, Col, FormControl } from "react-bootstrap";
import { useEffect } from "react";
import { getImageUrl, getUserInfoFromToken } from "../../../common/common";
import { useState } from "react";
import { LazyImage } from "../../../components";
import DefaultAvatar from "../../../assets/img/default-avatar.png";
import Skeleton from "react-loading-skeleton";
import TextareaAutosize from "react-textarea-autosize";

function MessageWithUser({ messageGroups }) {
    const { currentUser, isUserInfoLoading } = useSelector((state) => state.message);

    const [selfInfo, setSelfInfo] = useState({
        avatar: null,
        firstName: "User",
        lastName: "Soulatte",
    });

    const [message, setMessage] = useState("");

    useEffect(() => {
        const userInfo = getUserInfoFromToken();
        setSelfInfo(userInfo);
    }, []);

    const dispatch = useDispatch();

    const handleKeyUp = (e) => {
        const ENTER = "Enter";
        if (e.key === ENTER && !e.shiftKey) {
            console.log("submit");
            setMessage("");
        }
    };

    return (
        <>
            <Row className="bg-facebook--dark m-2 p-4 br-10 h-85">
                <Col md={12}>
                    <Row className="h-15">
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
                                            src={
                                                currentUser.avatar
                                                    ? getImageUrl(currentUser.avatar)
                                                    : DefaultAvatar
                                            }
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
                    <Row className="h-75 overflow-auto">
                        <Col md={12} className="h-100">
                            {messageGroups.map((_group, _idx) => (
                                <Row key={_idx}>
                                    <Col
                                        md={{
                                            span: 4,
                                            offset: _group.fromSelf ? 8 : 0,
                                        }}
                                    >
                                        <div className="display--flex">
                                            <div style={{ alignSelf: "flex-end" }} className="mr-2">
                                                <LazyImage />
                                            </div>
                                            <div className="w-100">
                                                <p>
                                                    {_group.fromSelf
                                                        ? selfInfo.firstName
                                                        : currentUser.firstName}
                                                </p>
                                                {_group.messages.map((__msg) => (
                                                    <div
                                                        key={__msg.id}
                                                        className="p-2 msg__bg--light br-10"
                                                    >
                                                        {__msg.content}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            ))}
                        </Col>
                    </Row>
                    <Row className="h-10 w-100 display--table m-0 overflow-auto">
                        <div className="display--table-cell vertical-align-middle w-100">
                            <FormControl
                                className="w-100"
                                type="text"
                                placeholder="Tin nhắn"
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyUp={handleKeyUp}
                                as={TextareaAutosize}
                                maxRows={1}
                            />
                        </div>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default MessageWithUser;
