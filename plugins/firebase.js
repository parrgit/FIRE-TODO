import firebase from "firebase";
import config from "~/firebaseConfig.json";

if (!firebase.apps.length) {
  firebase.initializeApp({ ...config });
}

export default firebase;
