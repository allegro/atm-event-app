// @flow
import firebase from 'firebase';
import EventEmitter from 'events';

export default class FirebaseAuth extends EventEmitter {
    constructor(firebaseConfig) {
        super();

        const app = this.app = firebase.initializeApp(firebaseConfig);
        const auth = app.auth();
        const database = app.database().ref();

        auth.onAuthStateChanged(user => {
            if (!user) {
                this.emit('userNotLogged');
            } else {
                database.on('value', snapshot => {
                    const data = snapshot.val();
                    this.emit('userLoggedIn', user, data);
                });
            }
        });

        this.actions = {
            /**
             *
             * @returns {Promise}
             */
            logout: () => auth.signOut(),

            /**
             *
             * @param {String} email
             * @param {String} password
             * @returns {Promise}
             */
            login: (email, password) => auth.signInWithEmailAndPassword(email, password),

            /**
             *
             * @param {String} talkId
             * @param {Number} score
             */
            vote: (talkId, score) => {
                database.child(`/votes/${talkId}/${auth.currentUser.displayName}/`).update({
                    score: score,
                    time: new Date()
                });
            }
        }
    }
}
