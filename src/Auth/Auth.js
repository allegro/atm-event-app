// @flow
import config from '../Config/config';
import firebase from 'firebase';
import Profile from "./Profile";

firebase.initializeApp(config.FIREBASE_CONFIG);

export default class FirebaseAuth {

    constructor() {
        this._firebase = firebase;
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.getProfile = this.getProfile.bind(this);
        this.onAuthStateChanged = this.onAuthStateChanged.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.isAdmin = this.isAdmin.bind(this);
    }

    isAuthenticated() {
        return null !== this._firebase.auth().currentUser;
    }

    getProfile() {
        if (this.isAuthenticated()) {
            const currentUser = this._firebase.auth().currentUser;
            if (currentUser) {
                return new Profile(currentUser);
            }
        }
    }

    onAuthStateChanged(func) {
        return this._firebase.auth().onAuthStateChanged(func);
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
        this._firebase.auth().signOut();
    }

    isAdmin() {
        if (this.isAuthenticated()) return this._firebase.auth().currentUser.role === 'admin';
        return false
    }


    get firebase() {
        return this._firebase;
    }
}
