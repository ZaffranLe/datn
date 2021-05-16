import { Row, Col, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as profileActions from "../../slice";
import { getImageUrl } from "../../../../common/common";
import * as imageModalActions from "../../../../components/album/image-modal/slice";

function ProfileImage(props) {
    const { images, user } = useSelector((state) => state.profile);

    const dispatch = useDispatch();

    useEffect(() => {
        if (images.length === 0) {
            dispatch(profileActions.getImagesByUserId(user.id));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const handleViewImage = (idImage) => {
        dispatch(imageModalActions.openModal(idImage));
    };

    return (
        <>
            <Row className="bg-facebook--darker pt-4 pb-5 justify-content-center">
                <Col md={12} className="bg-facebook--dark border--round p-3">
                    <Row>
                        {images.length > 0 ? (
                            images.map((img, idx) => (
                                <Col md={2} key={idx} className="p-3">
                                    <div
                                        onClick={() => handleViewImage(img.id)}
                                        className="profile__img bg-img border--round"
                                        style={{ background: `url(${getImageUrl(img.fileName)})` }}
                                    ></div>
                                </Col>
                            ))
                        ) : (
                            <Alert variant="dark">Người dùng hiện chưa đăng ảnh.</Alert>
                        )}
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default ProfileImage;
