import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getImageUrl,
  calcTimeDifferenceFromNow,
} from "../../../../common/common";
import { LazyImage } from "../../../../components";
import * as imageModalActions from "../../../../components/album/image-modal/slice";
import NewComment from "./new-comment";

function Comment({ comment, post, setPost }) {
  const [showReply, setShowReply] = useState(false);
  const dispatch = useDispatch();

  const handleViewImage = (idImg) => {
    dispatch(imageModalActions.openModal(idImg));
  };

  const handleShowReply = () => {
    setShowReply(!showReply);
  };

  return (
    <>
      <Row className="mt-2 mb-2 p-2">
        <Col md={1}>
          <LazyImage
            className="clickable"
            as={Link}
            to={`/profile/${comment.userSlug}`}
            style={{
              width: 40,
              height: 40,
              borderRadius: 40,
            }}
            src={getImageUrl(comment.userAvatar)}
          />
        </Col>
        <Col md={11} className="bg-facebook--darker br-10 pt-2 pb-2">
          <Row>
            <Col md={12}>
              <Link
                to={`/profile/${comment.userSlug}`}
                className="clickable text-white font-weight-bold"
              >
                {comment.userLastName} {comment.userFirstName}
              </Link>
            </Col>
          </Row>
          {comment.content && (
            <Row>
              <Col md={12}>
                <pre className="text-white comment">{comment.content}</pre>
              </Col>
            </Row>
          )}
          {comment.imgFileName && (
            <Row className="mt-2">
              <Col md={12}>
                <LazyImage
                  src={getImageUrl(comment.imgFileName)}
                  onClick={() => handleViewImage(comment.imgId)}
                  className="clickable br-10"
                  style={{
                    width: 300,
                    height: 225,
                  }}
                />
              </Col>
            </Row>
          )}
          <Row className="mb-2 mt-2">
            <Col md={12}>
              <small className="text-white-50">
                {calcTimeDifferenceFromNow(comment.createdAt)}
              </small>{" "}
              <span className="clickable" onClick={handleShowReply}>
                Trả lời
              </span>
            </Col>
          </Row>
          {comment.comments.map((_comment) => (
            <Comment
              key={_comment.id}
              post={post}
              setPost={setPost}
              comment={_comment}
            />
          ))}
          {showReply && (
            <NewComment post={post} setPost={setPost} replyComment={comment} />
          )}
        </Col>
      </Row>
    </>
  );
}

export default Comment;
