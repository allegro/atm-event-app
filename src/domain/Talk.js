export default class Talk {
    constructor({ title = "#empty#", description = "", speakers, start, end }) {
        this.title = title;
        this.description = description;
        this.speakers = speakers;
        this.start = start;
        this.end = end;
    }

    static fromFirebase(talk, speakersMap) {
        return new Talk({
            ...talk,
            speakers: (talk.speakers || []).map(speakerRef => speakersMap[speakerRef.id])
        });
    }
}