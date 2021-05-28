import { Row, Col } from "react-bootstrap";
import MessageList from "./components/message-list";

function Message(props) {
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
                            <Row className="bg-facebook--dark m-2 p-4 br-10 h-75">Test</Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default Message;
