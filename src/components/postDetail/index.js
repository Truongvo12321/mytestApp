import './index.css';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { addNewComment, getCommentData, updateComment, deleteCmtStatus } from '../../db/commentsDTO';
import { IoSend } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import { MdCancelPresentation } from 'react-icons/md';
import { FaRegCheckSquare } from 'react-icons/fa';
function PostDetail({ postItemData, setPostDetailDisplay }) {
  const [commentMsg, setCommentMsg] = useState('');
  const [commentList, setCommentList] = useState([]);
  const [commentChange, setCommentChange] = useState('');
  const [cmtSelec, setCmtSelec] = useState();
  const [editCmtDisplay, setEditCmtDisplay] = useState(false);
  const handleAddComment = async () => {
    const commentData = {
      comment: commentMsg,
      created: Date.now(),
      modified: '',
      avatar: 'https://tse4.mm.bing.net/th?id=OIP.ry0FnYNVVc6OOFGJhoPRKAHaI0&pid=Api&P=0&h=180',
      status: 1,
      userName: 'User',
      postID: postItemData.postItemID,
    };
    if (commentMsg === '') {
      alert('Please enter your comment!');
    } else {
      await addNewComment(commentData);
      setCommentMsg('');
    }
  };
  const handleUpdateCmt = async (id, postID, newCmt) => {
    try {
      await updateComment(id, postID, newCmt);
    } catch (error) {
      console.error('Failed to update post status:', error);
    }
  };
  const handleDeleteCmt = async (postID, status) => {
    try {
      await deleteCmtStatus(postID, status);
    } catch (error) {
      console.error('Failed to update post status:', error);
    }
  };
  useEffect(() => {
    getCommentData((sortedMsg) => {
      setCommentList(sortedMsg);
    }, postItemData.postItemID);
  }, [postItemData.postItemID]);

  return (
    <div className="post-detail-layout">
      <div className="post-detail-cont">
        <IoMdClose
          className="post-detail-close"
          onClick={() => {
            setPostDetailDisplay(false);
          }}
        ></IoMdClose>
        <p className="post-detail-title">{postItemData.title}</p>
        <p className="post-detail-des">{postItemData.des}</p>
        <img className="post-detail-img" src={postItemData.img} alt=""></img>
        <ul className="post-detail-cmt-list">
          {commentList.map((comment, index) => (
            <li className="post-detail-cmt-item" key={index}>
              <img className="detail-cmt-avatar" src={comment.avatar} alt=""></img>
              <div>
                <p className="detail-cmt-name">{comment.userName}</p>
                <p className="detail-cmt-content">{comment.comment}</p>
              </div>
              <div className="detail-cmt-option">
                <CiEdit
                  className="detail-cmt-icon"
                  onClick={() => {
                    setCmtSelec(comment);
                    setEditCmtDisplay(true);
                  }}
                ></CiEdit>
                <MdDeleteOutline
                  className="detail-cmt-icon"
                  onClick={() => {
                    handleDeleteCmt(comment.id, 0);
                  }}
                ></MdDeleteOutline>
              </div>
            </li>
          ))}
        </ul>
        <div className="detail-cmt-nav">
          <input
            className="detail-cmt-input"
            placeholder="Enter your comment"
            onChange={(e) => {
              setCommentMsg(e.target.value);
            }}
          ></input>
          <IoSend
            className="detail-cmt-icon"
            onClick={() => {
              handleAddComment();
            }}
          ></IoSend>
        </div>
      </div>
      {editCmtDisplay === true && (
        <div className="edit-cmt-layout">
          <div className="edit-cmt-contn">
            <p className="edit-cmt-title">Edit Comment</p>
            <input
              className="detail-cmt-content"
              placeholder="Enter your change"
              value={commentChange}
              onChange={(e) => {
                setCommentChange(e.target.value);
              }}
            ></input>
            <div className="detail-cmt-nav">
              <FaRegCheckSquare
                onClick={() => {
                  handleUpdateCmt(cmtSelec.id, cmtSelec.postID, commentChange);
                  setCommentChange('');
                  setEditCmtDisplay(false);
                }}
              ></FaRegCheckSquare>
              <MdCancelPresentation
                onClick={() => {
                  setEditCmtDisplay(false);
                }}
              ></MdCancelPresentation>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
PostDetail.propTypes = {
  postItemData: PropTypes.object?.isRequired,
  setPostDetailDisplay: PropTypes.function?.isRequired,
};
export default PostDetail;
