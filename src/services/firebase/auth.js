// import { OAuthProvider } from 'firebase/auth';

import {auth} from "../../utils/firebase-config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

class FirebaseAuth {
    constructor() {
        this.auth = auth;
    }
 
    signInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(this.auth, provider);
        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    };
    
    // signInWithApple = async () => {
    //     try {
    //         const provider = new OAuthProvider('apple.com');
    //         await this.auth.signInWithPopup(provider);
    //     } catch (error) {
    //         console.error('Error signing in with Google:', error);
    //     }
    // };

    signInWithEmail = async (email, password) => {
        try {
            await signInWithEmailAndPassword(this.auth, email, password);
        } catch (error) {
            console.error('Error signing in with email and password:', error);
        }
    };

    signUpWithEmail = async (email, password) => {
        try {
            await createUserWithEmailAndPassword(this.auth, email, password);
            await sendEmailVerification(this.auth.currentUser);
        } catch (error) {
            console.error('Error signing up with email and password:', error);
        }
    };


    signOut = async () => {
        try {
            await signOut(this.auth);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    getCurrentUser = () => {
        return this.auth.currentUser;
    };
}
const firebaseAuth = new FirebaseAuth();

export default firebaseAuth;