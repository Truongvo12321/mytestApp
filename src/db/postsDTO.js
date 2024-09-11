import db from './firebase';
import { collection, getDocs, query, orderBy, addDoc, setDoc, doc, where, updateDoc } from 'firebase/firestore';
export async function getPostsData() {
  try {
    const userRef = collection(db, 'posts');
    const q = query(userRef, where('status', '==', 1), orderBy('created', 'desc'));
    const querySnapshot = await getDocs(q);

    let posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({
        id: doc.id,
        data: doc.data(),
      });
    });

    return posts;
  } catch (ex) {
    console.error('Error fetching posts data:', ex);
    return [];
  }
}

export async function addPostItem(newPostData) {
  try {
    const timestamp = Date.now();
    const docRef = await addDoc(collection(db, 'posts'), newPostData);
    const newData = { ...newPostData, postItemID: docRef.id, created: timestamp };
    await setDoc(doc(db, 'posts', docRef.id), newData);
    return true;
  } catch (ex) {
    console.error('Error adding post:', ex);
    return false;
  }
}
export async function updatePostItem(data) {
  try {
    const roomsRef = collection(db, 'posts');
    const q = query(roomsRef, where('postItemID', '==', data.postItemID));
    const querySnapshot = await getDocs(q);

    let postItemId = null;
    querySnapshot.forEach((doc) => {
      postItemId = doc.id;
    });

    if (postItemId) {
      await updateDoc(doc(roomsRef, postItemId), {
        ...data,
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
export async function updatePostStatus(postItemID, status) {
  try {
    const usersRef = collection(db, 'posts');
    const q = query(usersRef, where('postItemID', '==', postItemID));
    const querySnapshot = await getDocs(q);
    let postId = '';
    querySnapshot.forEach((doc) => {
      postId = doc.id;
    });
    await updateDoc(doc(usersRef, postId), {
      status: status ? 1 : 0,
      modified: Date.now(),
    });
    return true;
  } catch (ex) {
    return false;
  }
}
