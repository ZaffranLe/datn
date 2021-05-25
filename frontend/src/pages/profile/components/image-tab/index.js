import { Row, Col, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as profileActions from "../../slice";
import { getImageUrl } from "../../../../common/common";
import * as imageModalActions from "../../../../components/album/image-modal/slice";
import { LazyImage } from "../../../../components";

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
                                    <LazyImage
                                        onClick={() => handleViewImage(img.id)}
                                        src={getImageUrl(img.fileName)}
                                        className="profile__img border--round"
                                    />
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
