import { Row, Col } from "react-bootstrap";
import FbImageLibrary from "react-facebook-photo-grid";

function PhotoSection({ images }) {
    return (
        <>
            <Row>
                <Col md={12}>
                    <FbImageLibrary images={images} />
                </Col>
            </Row>
        </>
    );
}

export default PhotoSection;
