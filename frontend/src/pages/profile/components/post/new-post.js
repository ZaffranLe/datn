import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Image, Modal, Form, OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import DefaultAvatar from "../../../../assets/img/default-avatar.png";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { getImageUrl } from "../../../../common/common";

function NewPost(props) {
    const userInfo = window.userInfo;

    const [imgHeight, setImgHeight] = useState(40);
    const [newPostModal, setNewPostModal] = useState(false);
    const [content, setContent] = useState("");
    const [images, setImages] = useState([]);

    useEffect(() => {
        const newPostBtn = document.getElementById("new-post-btn");
        setImgHeight(newPostBtn.clientHeight);
    }, []);

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

    const handleAddImage = (e) => {
        const _images = e.target.files;
        const imagesPreview = [];
        const imagesBase64 = [];
        if (_images.length > 0) {
            for (let _image of _images) {
                const name = v4();
                imagesPreview.push({
                    url: URL.createObjectURL(_image),
                    name,
                    error: false,
                });
                const reader = new FileReader();
                reader.readAsDataURL(_image);
                reader.onload = function () {
                    imagesBase64.push({
                        base64: reader.result,
                        name,
                    });
                };
                reader.onerror = function (error) {
                    toast.error("Upload ảnh lỗi!");
                };
            }

            setImages(imagesPreview);
        }
    };

    const NEW_POST_PLACEHOLDER = "Bạn đang suy nghĩ về gì vậy?";

    const inputRef = useRef(null);

    return (
        <>
            <Row>
                <Col md={12} className="bg-facebook--dark br-10 p-3">
                    <Row>
                        <Col md={2} className="text-center">
                            <div
                                style={{
                                    width: imgHeight,
                                    height: imgHeight,
                                    borderRadius: imgHeight,
                                    margin: "auto",
                                    background: `url(${
                                        userInfo.avatar ? getImageUrl(userInfo.avatar.fileName) : DefaultAvatar
                                    })`,
                                }}
                                className="bg-img"
                            ></div>
                        </Col>
                        <Col md={10} className="pl-0">
                            <div
                                className="br-50 w-100 p-3 profile__new-post-btn text-truncate"
                                id="new-post-btn"
                                onClick={handleSelectNewPost}
                            >
                                <span>{content ? content : NEW_POST_PLACEHOLDER}</span>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            {/* New post modal */}
            <Modal show={newPostModal} onHide={handleCloseNewPost} centered size="lg" className="new-post-modal">
                <Modal.Header closeButton className="bg-facebook--dark new-post-modal__header p-4">
                    <Modal.Title>Đăng bài</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-facebook--dark new-post-modal__body p-4">
                    <Row className="mb-4">
                        <Col md={12}>
                            <div style={{ display: "flex" }}>
                                <div
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: 50,
                                        background: `url(${
                                            userInfo.avatar ? getImageUrl(userInfo.avatar.fileName) : DefaultAvatar
                                        })`,
                                    }}
                                    className="bg-img"
                                ></div>
                                <div style={{ fontSize: 20, height: 50 }} className="display--table ml-2">
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
                    <Row className="br-10 border border-secondary p-3 m-0 mb-3 display--table">
                        <Col md={6} className="display--table-cell vertical-align-middle">
                            <span style={{ fontSize: 20 }}>Thêm vào bài đăng</span>
                        </Col>
                        <Col md={6} className="text-right display--table-cell vertical-align-middle">
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
                                onChange={handleAddImage}
                            />
                        </Col>
                    </Row>
                    <Button block disabled={!content} variant="primary" className="br-10">
                        Đăng
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default NewPost;
