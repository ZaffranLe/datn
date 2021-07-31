import { useSelector, useDispatch } from "react-redux";
import { Row, Col, FormControl } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { getImageUrl, getUserInfoFromToken } from "../../../common/common";
import { useState } from "react";
import { LazyImage } from "../../../components";
import DefaultAvatar from "../../../assets/img/default-avatar.png";
import Skeleton from "react-loading-skeleton";
import TextareaAutosize from "react-textarea-autosize";
import * as messageActions from "../slice";
import { SocketContext } from "../../../context";
import { Link } from "react-router-dom";
import moment from "moment";

function MessageWithUser({ messageGroups }) {
    const socket = useContext(SocketContext);
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

    useEffect(() => {
        if (messageGroups.length > 0) {
            const chatbox = document.getElementById("chatbox");
            chatbox.scrollTop = chatbox.scrollHeight;
        }
    }, [messageGroups]);

    const dispatch = useDispatch();

    const handleKeyUp = (e) => {
        const ENTER = "Enter";
        if (e.key === ENTER && !e.shiftKey && message) {
            console.log(message);
            console.log(message.trim());
            const info = {
                idUserTo: currentUser.id,
                content: message.trim(),
                image: null,
                createdAt: new Date(),
            };
            dispatch(messageActions.sendMessage(info, socket));
            setMessage("");
        }
    };

    return (
        <>
            {currentUser && (
                <Row className="bg-facebook--dark m-2 p-4 br-10 h-90">
                    <Col md={12} className="h-100">
                        <Row className="h-15">
                            <Col md={12}>
                                {isUserInfoLoading ? (
                                    <>
                                        <Skeleton count={1} />
                                    </>
                                ) : (
                                    <div className="display--flex pb-4 mb-3 border-bottom">
                                        <Link to={`/profile/${currentUser.slug}`}>
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
                                        </Link>
                                        <div style={{ height: 60 }} className="display--table ml-2">
                                            <span className="display--table-cell vertical-align-middle">
                                                <Link to={`/profile/${currentUser.slug}`}>
                                                    <big className="text-white">
                                                        {currentUser.lastName}{" "}
                                                        {currentUser.firstName}
                                                    </big>
                                                </Link>
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </Col>
                        </Row>
                        <Row className="h-75 overflow-auto" id="chatbox">
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
                                                {!_group.fromSelf && (
                                                    <div
                                                        style={{ alignSelf: "flex-end" }}
                                                        className="mr-2"
                                                    >
                                                        <Link to={`/profile/${currentUser.slug}`}>
                                                            <LazyImage
                                                                style={{
                                                                    width: 40,
                                                                    height: 40,
                                                                    borderRadius: 40,
                                                                }}
                                                                src={
                                                                    currentUser.avatar
                                                                        ? getImageUrl(
                                                                              currentUser.avatar
                                                                          )
                                                                        : DefaultAvatar
                                                                }
                                                            />
                                                        </Link>
                                                    </div>
                                                )}
                                                <div className="w-100">
                                                    <Link
                                                        to={`/profile/${
                                                            _group.fromSelf
                                                                ? selfInfo.slug
                                                                : currentUser.slug
                                                        }`}
                                                    >
                                                        <p className="text-white">
                                                            {_group.fromSelf
                                                                ? selfInfo.firstName
                                                                : currentUser.firstName}
                                                        </p>
                                                    </Link>
                                                    {_group.messages.map((__msg, __idx) => (
                                                        <div
                                                            key={__idx}
                                                            className="p-2 msg__bg--light br-10 mt-2"
                                                        >
                                                            <pre className="comment text-white mb-0">
                                                                {__msg.content}
                                                            </pre>
                                                        </div>
                                                    ))}
                                                </div>
                                                {_group.fromSelf && (
                                                    <div
                                                        style={{ alignSelf: "flex-end" }}
                                                        className="ml-2"
                                                    >
                                                        <LazyImage
                                                            style={{
                                                                width: 40,
                                                                height: 40,
                                                                borderRadius: 40,
                                                            }}
                                                            src={
                                                                selfInfo.avatar
                                                                    ? getImageUrl(
                                                                          selfInfo.avatar.fileName
                                                                      )
                                                                    : DefaultAvatar
                                                            }
                                                        />
                                                    </div>
                                                )}
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
                                    value={message}
                                />
                            </div>
                        </Row>
                    </Col>
                </Row>
            )}
        </>
    );
}

export default MessageWithUser;
