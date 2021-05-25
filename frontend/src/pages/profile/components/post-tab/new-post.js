import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Modal, Form, OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import DefaultAvatar from "../../../../assets/img/default-avatar.png";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";
import { getImageUrl, getUserInfoFromToken } from "../../../../common/common";
import { uploadImages } from "../../../../utils/api/common";
import constants from "../../../../common/constants";
import { useDispatch, useSelector } from "react-redux";
import * as profileActions from "../../slice";
import { LazyImage } from "../../../../components";

function NewPost(props) {
    const userInfo = getUserInfoFromToken();

    const { isLoading, isActionSucceed } = useSelector((state) => state.profile);

    const [newPostModal, setNewPostModal] = useState(false);
    const [content, setContent] = useState("");
    const [images, setImages] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        if (isActionSucceed) {
            setNewPostModal(false);
            setImages([]);
            setContent("");
            dispatch(profileActions.setActionSucceed(false));
            dispatch(profileActions.getPostByUserId());
        }
    }, [isActionSucceed, dispatch]);

    useEffect(() => {
        if (newPostModal) {
            inputRef.current.focus();
        }
    }, [newPostModal]);

    const handleChangeContent = (e) => {
        setContent(e.target.value);
    };

    const handleSelectNewPost = () => {
        setNewPostModal(true);
    };

    const handleCloseNewPost = () => {
        setNewPostModal(false);
    };

    const handleAddImage = async (e) => {
        try {
            let images = null;
            if (e.target.files.length > 0) {
                images = [...e.target.files];
            } else {
                return null;
            }
            const exceedSizeImg = images.find((img) => img.size > constants.MAX_FILE_SIZE);
            if (exceedSizeImg) {
                toast.error("Ảnh vượt quá kích thước tối đa 5MB!");
                return null;
            }
            const uploadedImages = await uploadImages(images);
            setImages(uploadedImages);
        } catch (e) {
            console.error(e);
            toast.error(e.response.data.message);
        }
    };

    const handleCreateNewPost = () => {
        dispatch(profileActions.createPost(images, content));
    };

    const NEW_POST_PLACEHOLDER = "Bạn đang suy nghĩ về gì vậy?";

    const inputRef = useRef(null);

    return (
        <>
            <Row>
                <Col md={12} className="bg-facebook--dark br-10 p-3">
                    <Row>
                        <Col md={12}>
                            <div className="display--flex">
                                <span>
                                    <div className="h-100 display--table">
                                        <span className="display--table-cell vertical-align-middle">
                                            <LazyImage
                                                style={{
                                                    width: 50,
                                                    height: 50,
                                                    borderRadius: 50,
                                                    margin: "auto",
                                                }}
                                                src={
                                                    userInfo.avatar
                                                        ? getImageUrl(userInfo.avatar.fileName)
                                                        : DefaultAvatar
                                                }
                                            />
                                        </span>
                                    </div>
                                </span>
                                <span className="w-100 ml-3">
                                    <div
                                        className="br-50 w-100 p-3 profile__new-post-btn text-truncate"
                                        id="new-post-btn"
                                        onClick={handleSelectNewPost}
                                    >
                                        <span>{content ? content : NEW_POST_PLACEHOLDER}</span>
                                    </div>
                                </span>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            {/* New post modal */}
            <Modal
                show={newPostModal}
                onHide={handleCloseNewPost}
                centered
                size="lg"
                className="new-post-modal"
            >
                <Modal.Header closeButton className="bg-facebook--dark new-post-modal__header p-4">
                    <Modal.Title>Đăng bài</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-facebook--dark new-post-modal__body p-4">
                    <Row className="mb-4">
                        <Col md={12}>
                            <div className="display--flex">
                                <LazyImage
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: 50,
                                    }}
                                    src={
                                        userInfo.avatar
                                            ? getImageUrl(userInfo.avatar.fileName)
                                            : DefaultAvatar
                                    }
                                />
                                <div
                                    style={{ fontSize: 20, height: 50 }}
                                    className="display--table ml-2"
                                >
                                    <span className="display--table-cell vertical-align-middle">
                                        {userInfo.lastName} {userInfo.firstName}
                                    </span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Form>
                        <Form.Group controlId="newPostContent">
                            <Form.Control
                                placeholder={NEW_POST_PLACEHOLDER}
                                className="bg-facebook--dark new-post-modal__body__input-content"
                                as={TextareaAutosize}
                                minRows={6}
                                value={content}
                                ref={inputRef}
                                onChange={handleChangeContent}
                            />
                        </Form.Group>
                    </Form>
                    <div style={{ overflowX: "auto", maxWidth: "100%" }} className="display--flex">
                        {images.map((img) => (
                            <span key={img.id} className="display--inherit">
                                <LazyImage
                                    src={getImageUrl(img.fileName)}
                                    className="m-2 avatar"
                                    style={{
                                        width: 200,
                                        height: 200,
                                    }}
                                />
                            </span>
                        ))}
                    </div>
                    <Row className="br-10 border border-secondary p-3 m-0 mb-3 display--table">
                        <Col md={6} className="display--table-cell vertical-align-middle">
                            <span style={{ fontSize: 20 }}>Thêm vào bài đăng</span>
                        </Col>
                        <Col
                            md={6}
                            className="text-right display--table-cell vertical-align-middle"
                        >
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
                    <Button
                        block
                        disabled={(!content && images.length === 0) || isLoading}
                        variant="primary"
                        className="br-10"
                        onClick={handleCreateNewPost}
                    >
                        {isLoading && <i className="fas fa-spinner fa-spin" />} Đăng
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default NewPost;
