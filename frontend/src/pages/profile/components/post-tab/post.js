import { Row, Col, OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { calcTimeDifferenceFromNow, getImageUrl } from "../../../../common/common";
import DefaultAvatar from "../../../../assets/img/default-avatar.png";
import moment from "moment";
import { Link } from "react-router-dom";
import "./index.scss";

function Post({ post, user }) {
    return (
        <>
            <Row className="justify-content-center pl-3 mt-3">
                <Col md={12}>
                    <Row>
                        <Col md={12} className="bg-facebook--dark br-10 p-3">
                            <Row>
                                <Col md={12}>
                                    <div className="display--flex">
                                        <span>
                                            <div
                                                style={{
                                                    width: 50,
                                                    height: 50,
                                                    borderRadius: 50,
                                                    margin: "auto",
                                                    background: `url(${
                                                        user.avatar ? getImageUrl(user.avatar.fileName) : DefaultAvatar
                                                    })`,
                                                }}
                                                className="bg-img"
                                            ></div>
                                        </span>
                                        <span className="w-100 ml-3">
                                            <div className="display--table h-100">
                                                <span className="display--table-cell vertical-align-middle">
                                                    <Row>
                                                        <Col md={12}>
                                                            <span
                                                                className="clickable text-white"
                                                                as={Link}
                                                                to={`${user.slug}`}
                                                            >
                                                                {user.lastName} {user.firstName}
                                                            </span>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md={12}>
                                                            <OverlayTrigger
                                                                key="bottom"
                                                                placement="bottom"
                                                                overlay={
                                                                    <Tooltip>
                                                                        <span>
                                                                            {moment(post.createdAt).format(
                                                                                "DD/MM/YYYY HH:mm"
                                                                            )}
                                                                        </span>
                                                                    </Tooltip>
                                                                }
                                                            >
                                                                <span className="text-white-50">
                                                                    {calcTimeDifferenceFromNow(post.createdAt)}
                                                                </span>
                                                            </OverlayTrigger>
                                                        </Col>
                                                    </Row>
                                                </span>
                                            </div>
                                        </span>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="border-bottom">
                                <Col md={12} className="pl-4 pt-3 pr-4">
                                    {/* <p className="post-content--truncate">{post.content}</p> */}
                                    <p>{post.content}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3} className="text-center p-2">
                                    <Button className="bg-facebook--dark" block><i className="fas fa-thumbs-up" /> Thích</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default Post;
