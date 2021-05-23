import { Row, Col, OverlayTrigger, Tooltip, Button, FormGroup, FormControl } from "react-bootstrap";
import DefaultAvatar from "../../../../assets/img/default-avatar.png";
import moment from "moment";
import { Link } from "react-router-dom";
import "./index.scss";
import PhotoSection from "./photo-section";
import * as api from "../../api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TextareaAutosize from "react-textarea-autosize";
import { getImageUrl, getUserInfoFromToken, calcTimeDifferenceFromNow } from "../../../../common/common";
import { uploadImages } from "../../../../utils/api/common";
import constants from "../../../../common/constants";

function Post({ post, user }) {
    const [_post, setPost] = useState(null);
    const [isLikeBtnLoading, setLikeBtnLoading] = useState(false);
    const [comment, setComment] = useState("");
    const [image, setImage] = useState(null);

    useEffect(() => {
        setPost({ ...post });
    }, [post]);

    const changeLikeStatus = async () => {
        setLikeBtnLoading(true);
        try {
            const data = await api.changeLikeStatus(_post.id);
            setPost({ ..._post, isLiked: data.isLiked, numOfLike: data.numOfLike });
        } catch (e) {
            toast.error("Hệ thống gặp sự cố! Vui lòng thử lại sau.");
        }
        setLikeBtnLoading(false);
    };

    const handleKeyUp = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            if (comment || image) {
                submitComment();
            }
        }
    };

    const handleAddImage = async (e) => {
        try {
            let image = null;
            if (e.target.files.length > 0) {
                image = e.target.files[0];
            } else {
                return null;
            }
            const exceedSizeImg = image.size > constants.MAX_FILE_SIZE;
            if (exceedSizeImg) {
                toast.error("Ảnh vượt quá kích thước tối đa 5MB!");
                return null;
            }
            const uploadedImages = await uploadImages([image]);
            setImage(uploadedImages[0]);
        } catch (e) {
            console.error(e);
            toast.error(e.response.data.message);
        }
    };

    const submitComment = async () => {
        try {
            await api.submitCommentToPost(_post.id, comment.trim(), image);
            setComment("");
            setImage(null);
        } catch (e) {
            toast.error("Hệ thống gặp sự cố! Vui lòng thử lại sau.");
        }
    };

    return (
        <>
            {_post && (
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
                                                            user.avatar
                                                                ? getImageUrl(user.avatar.fileName)
                                                                : DefaultAvatar
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
                                                                                {moment(_post.createdAt).format(
                                                                                    "DD/MM/YYYY HH:mm"
                                                                                )}
                                                                            </span>
                                                                        </Tooltip>
                                                                    }
                                                                >
                                                                    <span className="text-white-50">
                                                                        {calcTimeDifferenceFromNow(_post.createdAt)}
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
                                <Row>
                                    <Col md={12} className="pl-4 pt-3 pr-4">
                                        {/* <p className="post-content--truncate">{_post.content}</p> */}
                                        <p>{_post.content}</p>
                                    </Col>
                                </Row>
                                {_post.images.length > 0 && (
                                    <PhotoSection images={_post.images.map((img) => getImageUrl(img.fileName))} />
                                )}
                                <Row>
                                    <Col md={3} className="text-center p-3">
                                        <Button
                                            className={`bg-facebook--dark border-0 ${
                                                _post.isLiked ? "post-btn-liked" : "post-btn-like"
                                            }`}
                                            block
                                            disabled={isLikeBtnLoading}
                                            onClick={changeLikeStatus}
                                        >
                                            <i
                                                className={`fas ${
                                                    isLikeBtnLoading ? "fa-spin fa-spinner" : "fa-thumbs-up"
                                                }`}
                                            />{" "}
                                            {_post.isLiked ? "Đã thích" : "Thích"}
                                        </Button>
                                    </Col>
                                    <Col md={9}>
                                        <div className="h-100 display--table">
                                            <span className="display--table-cell vertical-align-middle">
                                                {_post.numOfLike !== 0 && (
                                                    <span className="text-primary">
                                                        <i className="fas fa-thumbs-up" /> {_post.numOfLike}
                                                    </span>
                                                )}
                                            </span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={11}>
                                        <FormControl
                                            className="bg-facebook--darker border-0 br-10"
                                            placeholder="Để lại bình luận của bạn"
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            onKeyUp={handleKeyUp}
                                            as={TextareaAutosize}
                                            minRows={1}
                                        />
                                    </Col>
                                    <Col md={1}>
                                        <OverlayTrigger
                                            placement="top"
                                            delay={{ show: 400, hide: 200 }}
                                            overlay={(_props) => <Tooltip {..._props}>Ảnh</Tooltip>}
                                        >
                                            <label htmlFor="upload-image" className="mb-0">
                                                <i className="fas fa-image text-success fa-2x clickable" />
                                            </label>
                                        </OverlayTrigger>
                                        <input
                                            type="file"
                                            className="d-none"
                                            id="upload-image"
                                            multiple
                                            accept="image/*"
                                            onChange={handleAddImage}
                                        />
                                    </Col>
                                </Row>
                                {image && (
                                    <Row>
                                        <Col md={12}>
                                            <div
                                                className="bg-img br-10 mt-2"
                                                style={{
                                                    width: 300,
                                                    height: 225,
                                                    background: `url(${getImageUrl(image.fileName)})`,
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                )}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            )}
        </>
    );
}

export default Post;
