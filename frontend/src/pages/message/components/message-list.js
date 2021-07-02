import { useEffect } from "react";
import { Row, Col, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { CustomLoader, UserMessage } from "../../../components";

function MessageList(props) {
    const { isMessageListLoading, messageList } = useSelector((state) => state.message);

    return (
        <>
            <Row style={{ overflowY: "auto" }} className="bg-facebook--dark m-2 p-4 br-10 h-85">
                <Col md={12}>
                    {isMessageListLoading ? (
                        <div className="w-100 h-100 text-center display--table">
                            <div className="display--table-cell vertical-align-middle">
                                <CustomLoader />
                            </div>
                        </div>
                    ) : (
                        <>
                            {messageList.length > 0 ? (
                                <>
                                    {messageList.map((msg, idx) => (
                                        <UserMessage key={idx} msg={msg} />
                                    ))}
                                </>
                            ) : (
                                <>
                                    <Alert variant="secondary" className="mt-2">
                                        Chưa có tin nhắn nào được ghi nhận
                                    </Alert>
                                </>
                            )}
                        </>
                    )}
                </Col>
            </Row>
        </>
    );
}

export default MessageList;
