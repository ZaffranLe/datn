import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
    getImageUrl,
    getUserInfoFromToken,
    calcTimeDifferenceFromNow,
} from "../../../../common/common";
import * as imageModalActions from "../../../../components/album/image-modal/slice";

function Comment({ comment }) {
    const dispatch = useDispatch();

    const handleViewImage = (idImg) => {
        dispatch(imageModalActions.openModal(idImg));
    };

    return (
        <>
            <Row className="mt-2 mb-2 p-2">
                <Col md={1}>
                    <div
                        className="bg-img clickable"
                        as={Link}
                        to={`/profile/${comment.userSlug}`}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 40,
                            background: `url(${getImageUrl(comment.userAvatar)})`,
                        }}
                    ></div>
                </Col>
                <Col md={11} className="bg-facebook--darker br-10 pt-2 pb-2">
                    <Row>
                        <Col md={12}>
                            <span
                                className="clickable text-white font-weight-bold"
                                as={Link}
                                to={`/profile/${comment.userSlug}`}
                            >
                                {comment.userLastName} {comment.userFirstName}
                            </span>
                        </Col>
                    </Row>
                    {comment.content && (
                        <Row>
                            <Col md={12}>
                                <pre className="text-white">{comment.content}</pre>
                            </Col>
                        </Row>
                    )}
                    {comment.imgFileName && (
                        <Row className="mt-2">
                            <Col md={12}>
                                <div
                                    onClick={() => handleViewImage(comment.imgId)}
                                    className="bg-img clickable br-10"
                                    style={{
                                        width: 300,
                                        height: 225,
                                        background: `url(${getImageUrl(comment.imgFileName)})`,
                                    }}
                                ></div>
                            </Col>
                        </Row>
                    )}
                    <Row className="mb-2 mt-2">
                        <Col md={12}>
                            <small className="text-white-50">{calcTimeDifferenceFromNow(comment.createdAt)}</small>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default Comment;
