export default class Talk {
    constructor(title, description, speaker, start, end) {
        this._title = title;
        this._description = description;
        this._speaker = speaker;
        this._start = start;
        this._end = end;
    }

    get title() {
        return this._title;
    }

    get description() {
        return this._description;
    }

    get speaker() {
        return this._speaker;
    }

    get start() {
        return this._start;
    }

    get end() {
        return this._end;
    }
}