import React, { useEffect } from "react";
import { Button, Col, Image, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CustomLoader } from "../..";
import { getImageUrl } from "../../../common/common";
import * as actions from "./slice";

function ImageModal(props) {
    const { isOpen, isLoading, image, idImage } = useSelector((state) => state.imageModal);
    const dispatch = useDispatch();

    useEffect(() => {
        if (idImage != null) {
            dispatch(actions.getImage(idImage));
        }
    }, [idImage, dispatch]);

    const handleCloseModal = () => {
        dispatch(actions.setOpen(false));
    };

    return (
        <Modal
            show={isOpen}
            onHide={handleCloseModal}
            centered
            dialogClassName="modal-90w modal-80h"
            contentClassName="modal-80h"
        >
            <Modal.Body className="modal-80h bg-facebook--dark">
                {isLoading ? (
                    <CustomLoader />
                ) : image ? (
                    <Row style={{ height: "inherit" }}>
                        <Col md={12} className="text-center p-5 border-right" style={{ maxHeight: "90%" }}>
                            <Image src={getImageUrl(image.fileName)} fluid style={{ maxHeight: "90%" }} />
                        </Col>
                        {/* <Col md={3} className="pl-5 pt-3" style={{ maxHeight: "90%", overflowY: "auto" }}>
                            <Image src={getImageUrl(image.fileName)} width={50} height={50} roundedCircle /> Sơn Tùng
                        </Col> */}
                    </Row>
                ) : (
                    <Row className="h-100">
                        <Col md={{ span: 6, offset: 3 }} className="display--table h-100">
                            <div className="display--table-cell vertical-align-middle text-center">
                                <h1>
                                    <i className="fas fa-cogs" /> Đã xảy ra sự cố khi tải ảnh
                                </h1>
                                <h2>Vui lòng thử lại sau ít phút</h2>
                            </div>
                        </Col>
                    </Row>
                )}
            </Modal.Body>
        </Modal>
    );
}

export default ImageModal;
