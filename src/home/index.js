import './index.css';
import { useState } from 'react';
import PostList from '../components/postList';
function HomeChat() {
  const [editPost, setEditPost] = useState(0);
  return (
    <div className="home-page">
      <div className="home-nav">
        <p className="home-title">Post List</p>
        <button
          className="add-post-btn"
          onClick={() => {
            setEditPost(1);
          }}
        >
          +
        </button>
      </div>
      <PostList editPost={editPost} setEditPost={setEditPost}></PostList>
    </div>
  );
}
export default HomeChat;
