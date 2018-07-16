export default class Speaker {
    constructor({ name, photo }) {
        this.name = name;
        this.photo = photo;
    }

    static fromFirebase(speaker) {
        return new Speaker(speaker);
    }
}