export const firebase = {
    apiKey: "AIzaSyAQ8RP8Ew5ILUqpg3EjReXX2LbqqO4jkIg",
    authDomain: "atm-voting.firebaseapp.com",
    databaseURL: "https://atm-voting.firebaseio.com",
    projectId: "atm-voting",
    storageBucket: "atm-voting.appspot.com",
    messagingSenderId: "639364440999"
};

export const reduxFirebase = {
    userProfile: "users",
    useFirestoreForProfile: true,
    updateProfileOnLogin: false
};

export default { firebase, reduxFirebase };