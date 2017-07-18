import slugify from 'slugify';

export default class ScheduleRecord {
    constructor({ date, start, end, title, content, speaker, type = 'talk', photo = 'https://bgalek.github.io/atm/img/speakers/person.svg'}) {
        this._id = slugify(title || '');
        this._date = date;
        this._start = start;
        this._end = end;
        this._title = title;
        this._content = content;
        this._speaker = speaker;
        this._photo = photo;
        this._type = type;
    }

    get date() {
        return this._date;
    }

    get start() {
        return this._start;
    }

    get end() {
        return this._end;
    }

    get title() {
        return this._title;
    }

    get content() {
        return this._content;
    }

    get speaker() {
        return this._speaker;
    }

    get photo() {
        return this._photo;
    }

    get id() {
        return this._id;
    }

    get key() {
        return this.___id;
    }

    get type() {
        return this._type;
    }

    isTechnical() {
        return !this.speaker;
    }
}