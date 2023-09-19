import firebaseAuth from "../services/firebase/auth";
import {auth} from "../utils/firebase-config";

export const initAuthListener = (onUserChanged) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      // 사용자가 로그인한 경우
      onUserChanged(user);
    } else {
      // 사용자가 로그아웃한 경우
      onUserChanged(null);
    }
  });
};

