import React from "react";
import { Button, Col, Image, Modal, Row } from "react-bootstrap";
import DefaultAvatar from "../../../../assets/img/default-avatar.png";
import { history } from "../../../history";

function UserListModal({ open, onClose, users = [] }) {
    const handleNavigateProfile = (slug) => {
        history.push(`/profile/${slug}`);
    };

    return (
        <>
            <Modal show={open} onHide={onClose} centered>
                <Modal.Body>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <Row
                                className="clickable"
                                key={user.id}
                                style={{ height: 50 }}
                                onClick={() => handleNavigateProfile(user.slug)}
                            >
                                <Col md={2} className="display--table full-height">
                                    <Image
                                        width={50}
                                        height={50}
                                        src={DefaultAvatar}
                                        roundedCircle
                                        className="border display--table-cell vertical-align-middle"
                                    />
                                </Col>
                                <Col md={10} className="display--table full-height">
                                    <span className="display--table-cell vertical-align-middle">
                                        {user.lastName} {user.firstName}
                                    </span>
                                </Col>
                            </Row>
                        ))
                    ) : (
                        <span className="h5">Không có người dùng nào trong danh sách này</span>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UserListModal;
