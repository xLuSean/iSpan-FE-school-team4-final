import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useEffect } from 'react';
import { firebaseConfig } from './firebaseConfig';

const loginGoogle = async (callback) => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then(async (result) => {
      const user = result.user;
      console.log(user.providerData[0]);

      // user後端寫入資料庫等等的操作
      callback(user.providerData[0]);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default function useFirebase() {
  useEffect(() => {
    // 初始化
    initializeApp(firebaseConfig);
  }, []);

  return {
    loginGoogle,
  };
}
