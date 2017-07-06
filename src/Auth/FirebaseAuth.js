// @flow
import config from '../Config/config';
import firebase from 'firebase';

firebase.initializeApp(config.FIREBASE_CONFIG);

export default class FirebaseAuth {

    constructor() {
        this.firebase = firebase;
    }

    isAuthenticated() {
        return null !== firebase.auth().currentUser;
    }

    getProfile() {
        return firebase.auth().currentUser;
    }

    onAuthStateChanged(func) {
        return firebase.auth().onAuthStateChanged(func);
    }

    login(login, password) {
        firebase.auth().signInWithEmailAndPassword(login, password)
            .then(() => {
                console.log('Login complete, redirect!');
            })
            .catch((error) => {
                console.log('Login err: ', error.message);
            });
    }

    logout() {
        firebase.auth().signOut();
    }

    userHasScopes(scopes) {
        return true;
    }

}
