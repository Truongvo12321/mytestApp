import './index.css';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { MdCancelPresentation } from 'react-icons/md';
import { FaRegCheckSquare } from 'react-icons/fa';
const postcontent = {
  title: '',
  des: '',
  img: '',
  status: 1,
};
function AddPost({ editPost, setEditPost, onAddPost, editPostItem, onUpdatePost }) {
  const [formPostData, setFormPostData] = useState(postcontent);

  useEffect(() => {
    if (editPost === 2 && editPostItem) {
      setFormPostData(editPostItem);
    }
  }, [editPost, editPostItem]);

  const handleAddPostChange = (e) => {
    const { name, value } = e.target;
    setFormPostData({
      ...formPostData,
      [name]: value,
    });
  };

  const handleAddPostItem = async () => {
    await onAddPost(formPostData);
    setFormPostData(postcontent);
    setEditPost(0);
  };
  return (
    <div className="add-post-dis">
      {editPost === 1 && (
        <div className="add-post-cont">
          <p className="add-post-title">New Post</p>
          <div className="add-post-inputs">
            <img
              className="add-post-img"
              src={
                formPostData.img
                  ? formPostData.img
                  : 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDQ0NDQ0NDQ0NDQ0NDQ8NDQ8NDw0NFREWFhURFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKCQwNFA8OEisdExktKzcrKysrKysrKysrKysrKystKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAKwBJQMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQIH/8QAIBABAQEAAQQCAwAAAAAAAAAAAAERIQJBUYEx8GGhsf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDuIAAAJbzOPfhQAAABJAUAAAAAAAAAAAAAAABm9V2TLZZdvGS8ZPvhoAAATFAAAAASigAAAAAAAAAAAAAAAAAAAm8/HtQAAAABNUAAAAASqAAAAAAAAAJKAoAAAAAAAASAAAAAAAAAAAAigAAAAAAAUAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAE1QAAAAAAAAAAAAAAAAAAAAAABLvb+4oAABSQAEigAAAAAAAAAAAAAAAAmqAJ3UAAAAAAAAAAAEqgAAAAAAAAAigAAAARNUAAAAAAAAApQAAAAAAAAAAAAAAAAAAAAoAAAAAAAAAJZ98goAAICgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkBQAAAANAAAEUAAAAAAAAAAAABM9KAAAAAku/tQACAAAAAJFABMUAAAAARQAAAAASz80BQAAAAAE6t7ccz5m8byoACUFAAAAAAAAAABL2BROlQAAAAAAAASqAAAAAP/9k='
              }
              alt=""
            ></img>
            <div className="add-post-input-list">
              <div className="add-post-fiel">
                <label>Title:</label>
                <input
                  className="add-post-input"
                  id="addPostTitle"
                  type="text"
                  placeholder=""
                  name="title"
                  onChange={handleAddPostChange}
                  required
                ></input>
              </div>
              <div className="add-post-fiel">
                <label>Image:</label>
                <input
                  className="add-post-input"
                  id="addPostImage"
                  type="text"
                  placeholder=""
                  name="img"
                  onChange={handleAddPostChange}
                  required
                ></input>
              </div>
              <div className="add-post-fiel">
                <label>Description:</label>
                <input
                  className="add-post-input"
                  id="addPostDes"
                  type="text"
                  placeholder=""
                  name="des"
                  onChange={handleAddPostChange}
                  required
                ></input>
              </div>
            </div>
          </div>
          <div className="add-post-nav">
            <IoIosAddCircleOutline
              className="add-post-nav-btn"
              onClick={() => {
                handleAddPostItem();
              }}
            ></IoIosAddCircleOutline>
            <MdCancelPresentation
              className="add-post-nav-btn"
              onClick={() => {
                setEditPost(0);
              }}
            ></MdCancelPresentation>
          </div>
        </div>
      )}
      {editPost === 2 && (
        <div className="add-post-cont">
          <p className="add-post-title">Edit Post</p>
          <div className="add-post-inputs">
            <img
              className="add-post-img"
              src={
                formPostData.img
                  ? formPostData.img
                  : 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDQ0NDQ0NDQ0NDQ0NDQ8NDQ8NDw0NFREWFhURFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKCQwNFA8OEisdExktKzcrKysrKysrKysrKysrKystKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAKwBJQMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQIH/8QAIBABAQEAAQQCAwAAAAAAAAAAAAERIQJBUYEx8GGhsf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDuIAAAJbzOPfhQAAABJAUAAAAAAAAAAAAAAABm9V2TLZZdvGS8ZPvhoAAATFAAAAASigAAAAAAAAAAAAAAAAAAAm8/HtQAAAABNUAAAAASqAAAAAAAAAJKAoAAAAAAAASAAAAAAAAAAAAigAAAAAAAUAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAE1QAAAAAAAAAAAAAAAAAAAAAABLvb+4oAABSQAEigAAAAAAAAAAAAAAAAmqAJ3UAAAAAAAAAAAEqgAAAAAAAAAigAAAARNUAAAAAAAAApQAAAAAAAAAAAAAAAAAAAAoAAAAAAAAAJZ98goAAICgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkBQAAAANAAAEUAAAAAAAAAAAABM9KAAAAAku/tQACAAAAAJFABMUAAAAARQAAAAASz80BQAAAAAE6t7ccz5m8byoACUFAAAAAAAAAABL2BROlQAAAAAAAASqAAAAAP/9k='
              }
              alt=""
            ></img>
            <div className="add-post-input-list">
              <div className="add-post-fiel">
                <label>Title:</label>
                <input
                  className="add-post-input"
                  id="addPostTitle"
                  type="text"
                  placeholder=""
                  name="title"
                  value={formPostData.title}
                  onChange={handleAddPostChange}
                  required
                ></input>
              </div>
              <div className="add-post-fiel">
                <label>Image:</label>
                <input
                  className="add-post-input"
                  id="addPostImage"
                  type="text"
                  placeholder=""
                  name="img"
                  value={formPostData.img}
                  onChange={handleAddPostChange}
                  required
                ></input>
              </div>
              <div className="add-post-fiel">
                <label>Description:</label>
                <input
                  className="add-post-input"
                  id="addPostDes"
                  type="text"
                  placeholder=""
                  name="des"
                  value={formPostData.des}
                  onChange={handleAddPostChange}
                  required
                ></input>
              </div>
            </div>
          </div>
          <div className="add-post-nav">
            <FaRegCheckSquare
              className="add-post-nav-btn"
              onClick={() => {
                onUpdatePost(formPostData);
                setEditPost(0);
              }}
            ></FaRegCheckSquare>
            <MdCancelPresentation
              className="add-post-nav-btn"
              onClick={() => {
                setEditPost(0);
              }}
            ></MdCancelPresentation>
          </div>
        </div>
      )}
    </div>
  );
}
AddPost.propTypes = {
  editPost: PropTypes.num?.isRequired,
  setEditPost: PropTypes.function?.isRequired,
  onAddPost: PropTypes.function?.isRequired,
  onUpdatePost: PropTypes.function?.isRequired,
  editPostItem: PropTypes.object?.isRequired,
};
export default AddPost;
