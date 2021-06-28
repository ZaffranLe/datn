import LazyImage from "./album/lazy-loading-img";
import classNames from "classnames";
import { Row, Col, OverlayTrigger, Tooltip, Badge } from "react-bootstrap";
import { getImageUrl, calcTimeDifferenceFromNow } from "../common/common";
import { useHistory } from "react-router-dom";

function UserMessage({ msg }) {
    const classes = classNames("mb-3", "pb-3", "pt-3", "user-message", {
        "user-message--unseen": !msg.isSeen,
    });

    const history = useHistory();

    const handleNavigateToMessage = () => {
        history.push(`/messages/${msg.slug}`)
    }

    return (
        <Row className={classes} onClick={handleNavigateToMessage}>
            <Col md={2} className="text-center">
                <div
                    className="h-100 display--table"
                    style={{ marginLeft: "auto", marginRight: "auto" }}
                >
                    <div className="display--table-cell vertical-align-middle">
                        <LazyImage
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 50,
                            }}
                            src={msg.avatar ? getImageUrl(msg.avatar) : null}
                        />
                    </div>
                </div>
            </Col>
            <Col md={7}>
                <Row className="mb-1">
                    <Col md={12} className="user-message__user-name text-truncate">
                        <OverlayTrigger
                            placement="top"
                            delay={{ show: 100, hide: 100 }}
                            overlay={<Tooltip>{`${msg.lastName} ${msg.firstName}`}</Tooltip>}
                        >
                            <span
                                style={{ fontSize: 20 }}
                                className={`${!msg.isSeen ? "font-weight-bold" : ""}`}
                            >{`${msg.lastName} ${msg.firstName}`}</span>
                        </OverlayTrigger>
                        {!msg.isSeen ? (
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
                        {`${msg.fromSelf ? "Bạn: " : ""}${
                            msg.content ? msg.content : "[Hình ảnh]"
                        }`}
                    </Col>
                </Row>
            </Col>
            <Col md={3} className="align-self-center text-truncate">
                {calcTimeDifferenceFromNow(msg.createdAt)}
            </Col>
        </Row>
    );
}

export default UserMessage;
