import md5 from 'blueimp-md5';

export default class Profile {

    constructor(currentUser) {
        this._displayName = currentUser.displayName;
        this._email = currentUser.email;
        this._photoURL = currentUser.photoURL || 'https://www.gravatar.com/avatar/' + md5(this._email.toLowerCase().trim());
    }

    get displayName() {
        return this._displayName;
    }

    get photoURL() {
        return this._photoURL;
    }

    get email() {
        return this._email;
    }
}