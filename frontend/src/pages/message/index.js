import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import MessageList from "./components/message-list";
import { CustomLoader } from "../../components";
import { useEffect, useState } from "react";
import { getUserInfoFromToken } from "../../common/common";
import MessageWithUser from "./components/message-with-user";
import * as messageActions from "./slice";
import "./style.scss";
import { useHistory } from "react-router-dom";

function Message(props) {
    const [messageGroups, setMessageGroups] = useState([]);
    const { currentUser, currentMessages, isLoading, messageList } = useSelector(
        (state) => state.message
    );

    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        if (currentUser) {
            const userInfo = getUserInfoFromToken();
            const _messageGroups = [];
            currentMessages.forEach((_msg, _idx) => {
                const FROM_SELF = _msg.idUserFrom === userInfo.id;
                if (
                    !currentMessages[_idx - 1] ||
                    currentMessages[_idx - 1].idUserFrom !== _msg.idUserFrom
                ) {
                    _messageGroups.push({
                        messages: [_msg],
                        firstName: FROM_SELF ? userInfo.firstName : currentUser.firstName,
                        lastName: FROM_SELF ? userInfo.lastName : currentUser.lastName,
                        fromSelf: FROM_SELF,
                    });
                } else {
                    _messageGroups[_messageGroups.length - 1].messages.push(_msg);
                }
            });
            setMessageGroups(_messageGroups);
        }
    }, [currentMessages, currentUser]);

    useEffect(() => {
        const _slug = props.match.params.slug;
        if (_slug) {
            dispatch(messageActions.getAllByUserSlug(_slug));
            dispatch(messageActions.getUserBasicInfoBySlug(_slug));
        } else {
            if (messageList.length > 0) {
                history.push(`/messages/${messageList[0].slug}`);
            } else {
                dispatch(messageActions.setCurrentUser(null));
                dispatch(messageActions.setCurrentMessages([]));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.match.params.slug, dispatch]);

    return (
        <>
            <Row className="bg-facebook--darker h-100">
                <Col md={12} className="p-5 h-100">
                    <Row>
                        <Col md={12}>
                            <span className="h1">Tin nhắn</span>
                        </Col>
                    </Row>
                    <Row className="h-100">
                        <Col md={4} className="h-100">
                            <MessageList />
                        </Col>
                        <Col md={8} className="h-100">
                            {isLoading ? (
                                <div className="w-100 h-100 text-center display--table">
                                    <div className="display--table-cell vertical-align-middle">
                                        <CustomLoader />
                                    </div>
                                </div>
                            ) : (
                                <MessageWithUser messageGroups={messageGroups} />
                            )}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default Message;
