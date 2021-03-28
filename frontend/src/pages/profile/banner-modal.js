import React from "react";
import { Image, Modal } from "react-bootstrap";

function BannerModal({ show, onHide, imgSrc }) {
    return (
        <Modal show={show} onHide={onHide} centered dialogClassName="modal-90w">
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <Image src={imgSrc} style={{ width: "100%" }} />
            </Modal.Body>
        </Modal>
    );
}

export default BannerModal;
