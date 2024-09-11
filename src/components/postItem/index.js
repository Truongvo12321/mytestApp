import './index.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import NotificationPopup from '../notificationPopup';
import { FaPenToSquare } from 'react-icons/fa6';
import { FaRegTrashAlt } from 'react-icons/fa';
const deletePostItem = 'Are you sure you want to delete this post?';
function PostItem({ postData, setEditPost, setEditPostItem, onUpdateStatus, setPostDetailDisplay }) {
  const [notiDisplay, setNotiDisplay] = useState(false);

  return (
    <>
      <div
        className="post-list-items"
        onClick={() => {
          setEditPostItem(postData);
          setPostDetailDisplay(true);
        }}
      >
        <img className="post-item-img" src={postData.img} alt="" />
        <div className="post-item-content">
          <div className="post-item-des">
            <p className="post-list-title">{postData.title}</p>
            <p className="post-list-p">{postData.des}</p>
          </div>
          <div
            className="post-item-edit"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <FaPenToSquare
              className="post-item-btn post-item-update-btn"
              onClick={() => {
                setEditPost(2);
                setEditPostItem(postData);
              }}
            ></FaPenToSquare>
            <FaRegTrashAlt
              className="post-item-btn post-item-delete-btn"
              onClick={() => {
                setNotiDisplay(true);
              }}
            ></FaRegTrashAlt>
          </div>
        </div>
      </div>
      {notiDisplay === true && (
        <NotificationPopup
          deletePostItem={deletePostItem}
          setNotiDisplay={setNotiDisplay}
          onConfirmDelete={() => {
            onUpdateStatus(postData.postItemID, 0);
          }}
        ></NotificationPopup>
      )}
    </>
  );
}
PostItem.propTypes = {
  postData: PropTypes.object?.isRequired,
  setEditPost: PropTypes.func?.isRequired,
  setEditPostItem: PropTypes.func?.isRequired,
  onUpdateStatus: PropTypes.func?.isRequired,
  setPostDetailDisplay: PropTypes.func?.isRequired,
};
export default PostItem;
