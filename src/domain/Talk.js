export default class Talk {
    static TYPE_TECHNICAL = "TECHNICAL";
    static TYPE_LIGHTNING = "LIGHTNING";

    constructor({ id, title = "", content = "", speakers, start, end, type, score = 0, votesCount = 0}) {
        this.id = id;
        this.title = title;
        this.description = content;
        this.speakers = speakers;
        this.start = start;
        this.end = end;
        this.type = type;
        this.score = score;
        this.votesCount = votesCount;
    }

    isLightning() {
        return this.type === Talk.TYPE_LIGHTNING;
    }

    static fromFirebase(talk, speakersMap) {
        return new Talk({
            ...talk,
            speakers: (talk.speakers || []).map(speakerRef => speakersMap[speakerRef.id])
        });
    }
}
