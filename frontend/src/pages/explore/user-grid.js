import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getImageUrl } from "../../common/common";
import { LazyImage } from "../../components";

function UserGrid(props) {
    const { users } = useSelector((state) => state.explore);
    return (
        <>
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <Row>
                        {users.map((user) => (
                            <UserItem key={user.id} user={user} />
                        ))}
                    </Row>
                </Col>
            </Row>
        </>
    );
}

function UserItem({ user }) {
    return (
        <>
            <Col md={3} className="p-3">
                <Row className="bg-facebook--dark br-10 text-center m-3 p-3">
                    <Col md={12}>
                        <Row>
                            <Col md={12}>
                                <div>
                                    <LazyImage
                                        style={{
                                            width: 100,
                                            height: 100,
                                            borderRadius: 100,
                                            marginLeft: "auto",
                                            marginRight: "auto",
                                        }}
                                        className="avatar"
                                        src={user.avatar ? getImageUrl(user.avatar.fileName) : null}
                                    />
                                </div>
                                <div>
                                    <p>{`${user.lastName} ${user.firstName}`.trim()}</p>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </>
    );
}

export default UserGrid;
