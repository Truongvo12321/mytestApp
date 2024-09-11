import './index.css';
import PropTypes from 'prop-types';
import { FaRegCheckSquare } from 'react-icons/fa';
import { MdCancelPresentation } from 'react-icons/md';
function NotificationPopup({ deletePostItem, setNotiDisplay, onConfirmDelete }) {
  return (
    <div className="noti-popup-layout">
      <div className="noti-cont">
        <p className="noti-title">Notification</p>
        <p className="noti-content">{deletePostItem}</p>
        <div className="noti-nav">
          <FaRegCheckSquare
            className="noti-nav-icon"
            onClick={() => {
              onConfirmDelete();
              setNotiDisplay(false);
            }}
          ></FaRegCheckSquare>
          <MdCancelPresentation
            className="noti-nav-icon"
            onClick={() => {
              setNotiDisplay(false);
            }}
          ></MdCancelPresentation>
        </div>
      </div>
    </div>
  );
}
NotificationPopup.propTypes = {
  deletePostItem: PropTypes.string?.isRequired,
  setNotiDisplay: PropTypes.bool?.isRequired,
  onConfirmDelete: PropTypes.func?.isRequired,
};
export default NotificationPopup;
