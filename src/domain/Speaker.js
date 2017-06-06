export default class Speaker {
    constructor({ name, photo, bio }) {
        this.id = name;
        this.name = name;
        this.photo = photo;
        this.bio = bio;
    }

    static fromFirebase(speaker) {
        return new Speaker(speaker);
    }
}
