import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Image, Modal, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import DefaultAvatar from "../../assets/img/default-avatar.png";
import TextareaAutosize from "react-textarea-autosize";

function NewPost(props) {
    const IMG_RATIO = 1; // ratio = width / height

    const QUOTES = [
        "Bạn có muốn chia sẻ điều gì không?",
        "Bạn đang suy nghĩ về gì vậy?",
        "Bạn vừa gặp chuyện vui? Hãy để chúng tôi cùng biết và chúc mừng",
    ];

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

    const pickRandomQuote = () => {
        const random = Math.floor(Math.random() * QUOTES.length);
        return QUOTES[random];
    };

    const handleAddImage = (e) => {
        const _images = e.target.files;
        if (_images.length > 0) {
            alert("sup")
        }
    };

    const newPostPlaceholder = pickRandomQuote();

    const inputRef = useRef(null);

    return (
        <>
            <Row>
                <Col md={12} className="bg-facebook--dark br-10 p-3">
                    <Row>
                        <Col md={2} className="text-center">
                            <Image src={DefaultAvatar} roundedCircle width={imgHeight * IMG_RATIO} height={imgHeight} />
                        </Col>
                        <Col md={10} className="pl-0">
                            <div
                                className="br-50 w-100 p-3 profile__new-post-btn text-truncate"
                                id="new-post-btn"
                                onClick={handleSelectNewPost}
                            >
                                <span>{content ? content : newPostPlaceholder}</span>
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
                            <span style={{ fontSize: 20 }}>
                                <Image src={DefaultAvatar} roundedCircle width={50} height={50} /> Sơn Tùng
                            </span>
                        </Col>
                    </Row>
                    <Form>
                        <Form.Group controlId="newPostContent">
                            <Form.Control
                                placeholder={newPostPlaceholder}
                                className="bg-facebook--dark new-post-modal__body__input-content"
                                as={TextareaAutosize}
                                minRows={6}
                                value={content}
                                ref={inputRef}
                                onChange={handleChangeContent}
                            />
                        </Form.Group>
                    </Form>
                    <Row className="br-10 border border-secondary p-3">
                        <Col md={6}>
                            <span style={{ fontSize: 20 }}>Thêm vào bài đăng</span>
                        </Col>
                        <Col md={6} className="text-right">
                            <OverlayTrigger
                                placement="top"
                                delay={{ show: 400, hide: 200 }}
                                overlay={(_props) => <Tooltip {..._props}>Ảnh</Tooltip>}
                            >
                                <label for="upload-image">
                                    <i className="fa fa-picture-o text-success fa-2x clickable" />
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
                </Modal.Body>
            </Modal>
        </>
    );
}

export default NewPost;
