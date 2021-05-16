import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import NewPost from "./new-post";
import Info from "./info";
import Skeleton from "react-loading-skeleton";
import UserListModal from "./user-list-modal";
import { useState } from "react";

function ProfilePost(props) {
    const [showUserList, setShowUserList] = useState(false);
    const [userList, setUserList] = useState([]);
    const { isLoading, user } = useSelector((state) => state.profile);
    const userInfo = window.userInfo;
    const handleShowUserList = (_userList) => {
        setShowUserList(true);
        setUserList(_userList);
    };

    const handleCloseUserList = () => {
        setShowUserList(false);
    };
    return (
        <>
            <Row className="bg-facebook--darker pt-4 pb-5 justify-content-center">
                <Col md={5}>
                    {isLoading ? <Skeleton count={10} /> : <Info handleShowUserList={handleShowUserList} user={user} />}
                </Col>
                <Col md={7}>
                    {userInfo.id === user.id && (
                        <Row className="justify-content-center pl-3">
                            <Col md={12}>
                                <NewPost />
                            </Col>
                        </Row>
                    )}
                </Col>
            </Row>
            <UserListModal open={showUserList} onClose={handleCloseUserList} users={userList} />
        </>
    );
}

export default ProfilePost;
