import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import MessageList from "./components/message-list";
import { CustomLoader } from "../../components";
import { useEffect, useState } from "react";

function Message(props) {
    const [messageGroups, setMessageGroups] = useState([]);
    const { currentUser, currentMessages, isLoading } = useSelector((state) => state.message);

    const dispatch = useDispatch();

    useEffect(() => {
        const _messageGroups = [];
        currentMessages.forEach((_msg, _idx) => {
            if (!currentMessages[_idx - 1] || currentMessages[_idx - 1].fromSelf !== _msg.fromSelf) {
                _messageGroups.push({
                    // group content
                });
            } else {
                _messageGroups[_messageGroups.length - 1].messages.push(_msg);
            }
        });
    }, [currentMessages]);

    useEffect(() => {
        const _slug = props.match.params.slug;
        if (_slug) {
            // dispatch(profileActions.getUserBySlug(_slug));
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
                        <Col md={4}>
                            <MessageList />
                        </Col>
                        <Col md={8}>
                            {isLoading ? (
                                <div className="w-100 h-100 text-center display--table">
                                    <div className="display--table-cell vertical-align-middle">
                                        <CustomLoader />
                                    </div>
                                </div>
                            ) : (
                                <Row className="bg-facebook--dark m-2 p-4 br-10 h-75">Test</Row>
                            )}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

function UserMessageGroup(props) {
    return <></>;
}

export default Message;
