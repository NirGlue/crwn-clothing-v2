import {initializeApp } from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {getFirestore, doc,getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDoZyrkGawzs0jDYNjvueXH9f541bf1-QY",
    authDomain: "crwn-clothing-db-c89fb.firebaseapp.com",
    projectId: "crwn-clothing-db-c89fb",
    storageBucket: "crwn-clothing-db-c89fb.appspot.com",
    messagingSenderId: "428954120047",
    appId: "1:428954120047:web:b8eebbe82e67f5577c829a"
  };

  // Initialize Firebase
  const firebaseapp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
      prompt:"select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth,provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth)=>{
      const userDocRef = doc(db, 'users', userAuth.uid)

      const userSnapshot = await getDoc(userDocRef)

      if(!userSnapshot.exists()){
          const {displayName, email} = userAuth;
          const createAt = new Date();

          try {
              await setDoc(userDocRef,{
                  displayName,
                  email,
                  createAt
              });
          } catch (error) {
              console.log("error creating the user", error.message);
          }
      }
      return userDocRef;
  }