export default class Speaker {
    constructor(name, photo) {
        this._name = name;
        this._photo = photo;
    }

    get name() {
        return this._name;
    }

    get photo() {
        return this._photo;
    }
}