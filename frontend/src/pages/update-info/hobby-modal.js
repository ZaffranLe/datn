import React, { useState } from "react";
import { Button, Container, FormControl, Modal } from "react-bootstrap";
import _ from "lodash";
import { HobbyPill } from "../../components";
import { getSlug } from "../../common/common";

function HobbyModal({ open, onClose, hobbies, currentHobbies, handleAddHobby, handleRemoveHobby }) {
    const [filteredHobbies, setFilteredHobbies] = useState([]);

    const handleSearchHobby = (e) => {
        const { value } = e.target;
        const _sluggedValue = getSlug(value);
        const _filteredHobbies = value ? hobbies.filter((i) => i.slug.includes(_sluggedValue)) : [];
        setFilteredHobbies(_filteredHobbies);
    };

    return (
        <>
            <Modal size="lg" show={open} centered onHide={onClose} restoreFocus={false} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title as="h3">Sở thích</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Modal.Title as="h5">
                        {currentHobbies.length > 0
                            ? "Các sở thích hiện tại"
                            : "Hiện bạn chưa có sở thích nào, hãy tìm cho mình một thú vui mới nhé."}
                    </Modal.Title>
                    <Container style={{ maxHeight: 400, overflow: "auto" }}>
                        {currentHobbies.length > 0 &&
                            currentHobbies.map((_hobby, _idx) => (
                                <HobbyPill
                                    key={_idx}
                                    hobby={_hobby}
                                    removable
                                    onClick={() => handleRemoveHobby(_hobby)}
                                />
                            ))}
                    </Container>
                </Modal.Body>
                <Modal.Body>
                    <FormControl
                        placeholder="Bạn thích làm gì lúc rảnh?"
                        onChange={_.debounce(handleSearchHobby, 250)}
                    />
                    {filteredHobbies
                        .filter((_hobby) => !currentHobbies.includes(_hobby))
                        .map((_hobby, _idx) => (
                            <HobbyPill key={_idx} hobby={_hobby} hoverable onClick={() => handleAddHobby(_hobby)} />
                        ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onClose} variant="secondary">
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default HobbyModal;
