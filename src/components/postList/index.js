import './index.css';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PostItem from '../postItem';
import PostDetail from '../postDetail';
import AddPost from '../editPostPopup';
import { getPostsData, addPostItem, updatePostItem, updatePostStatus } from '../../db/postsDTO';

function PostList({ editPost, setEditPost }) {
  const [postsData, setPostsData] = useState([]);
  const [postItemData, setPostItemData] = useState([]);
  const [postDetailDisplay, setPostDetailDisplay] = useState(false);
  async function fetchPostsData() {
    try {
      const roomByCateId = await getPostsData();
      setPostsData(roomByCateId);
    } catch (error) {
      console.log('error');
    }
  }
  const handleAddPost = async (newPost) => {
    if (newPost.title === '' || newPost.img === '' || newPost.des === '') {
      alert('Please fill in the blanks');
    } else {
      await addPostItem(newPost);
      fetchPostsData();
    }
  };
  const handleUpdatePost = async (newData) => {
    if (newData.title === '' || newData.img === '' || newData.des === '') {
      alert('Please fill in the blanks');
    } else {
      await updatePostItem(newData);
      fetchPostsData();
    }
  };
  const handleDeletePost = async (postID, status) => {
    try {
      await updatePostStatus(postID, status);
      fetchPostsData();
    } catch (error) {
      console.error('Failed to update post status:', error);
    }
  };

  useEffect(() => {
    fetchPostsData();
  }, []);

  return (
    <>
      <div className="post-list-cont">
        {postsData.map((post, index) => (
          <PostItem
            key={index}
            postData={post.data}
            setEditPost={setEditPost}
            setEditPostItem={setPostItemData}
            onUpdateStatus={handleDeletePost}
            setPostDetailDisplay={setPostDetailDisplay}
          />
        ))}
      </div>
      {editPost === 1 ? <AddPost editPost={editPost} setEditPost={setEditPost} onAddPost={handleAddPost} /> : ''}
      {editPost === 2 ? (
        <AddPost
          editPost={editPost}
          setEditPost={setEditPost}
          editPostItem={postItemData}
          onUpdatePost={handleUpdatePost}
        />
      ) : (
        ''
      )}
      {postDetailDisplay === true && (
        <PostDetail postItemData={postItemData} setPostDetailDisplay={setPostDetailDisplay}></PostDetail>
      )}
    </>
  );
}

PostList.propTypes = {
  editPost: PropTypes.number?.isRequired,
  setEditPost: PropTypes.func?.isRequired,
};

export default PostList;
