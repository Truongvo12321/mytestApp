import db from './firebase';
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  where,
  orderBy,
  updateDoc,
  getDocs,
  setDoc,
  doc,
} from 'firebase/firestore';
export async function addNewComment(commentData) {
  try {
    const commentsRef = collection(db, 'comments');
    const docRef = await addDoc(commentsRef, commentData);

    const commentId = docRef.id;

    await setDoc(docRef, { ...commentData, id: commentId }, { merge: true });

    return commentId;
  } catch (ex) {
    console.error('Error adding new comment:', ex);
    return null;
  }
}
export async function getCommentData(callback, postID) {
  try {
    const commentRef = collection(db, 'comments');

    const q = query(commentRef, where('postID', '==', postID), where('status', '==', 1), orderBy('created', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedComments = [];
      querySnapshot.forEach((doc) => {
        fetchedComments.push({ ...doc.data(), id: doc.id });
      });
      const sortedComments = fetchedComments.sort((a, b) => a.created - b.created);
      callback(sortedComments);
    });

    return unsubscribe;
  } catch (ex) {
    console.error('Error getting comment data:', ex);
    return [];
  }
}

export async function updateComment(commentID, postID, newComment) {
  try {
    const roomsRef = collection(db, 'comments');
    const q = query(roomsRef, where('id', '==', commentID), where('postID', '==', postID));
    const querySnapshot = await getDocs(q);

    let postItemId = null;
    querySnapshot.forEach((doc) => {
      postItemId = doc.id;
    });

    if (postItemId) {
      await updateDoc(doc(roomsRef, postItemId), {
        comment: newComment,
        modified: Date.now(),
      });
      return true;
    } else {
      return false;
    }
  } catch (ex) {
    console.error('Error updating document: ', ex);
    return false;
  }
}
export async function deleteCmtStatus(cmtID, status) {
  try {
    const usersRef = collection(db, 'comments');
    const q = query(usersRef, where('id', '==', cmtID));
    const querySnapshot = await getDocs(q);
    let cmtId = '';
    querySnapshot.forEach((doc) => {
      cmtId = doc.id;
    });
    await updateDoc(doc(usersRef, cmtId), {
      status: status ? 1 : 0,
      modified: Date.now(),
    });
    return true;
  } catch (ex) {
    return false;
  }
}
