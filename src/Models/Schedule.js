import TAFFY from 'taffy';
import ScheduleRecord from "../Views/Schedule/ScheduleRecord";
import moment from 'moment';

export default class ScheduleRepository {

    constructor(snapshot) {
        const records = snapshot.map(item => item.agenda
            .map(record => new ScheduleRecord({
                date: item.date,
                start: record.start,
                end: record.end,
                title: record.title,
                type: record.type,
                content: record.content,
                speakers: Array.isArray(record.speakers) ? record.speakers : (record.speaker ? [ record.speaker ] : []),
                photo: record.photo
            })))
            .reduce((a, b) => a.concat(b), []);
        this.records = TAFFY(records);
    }

    findAll(date) {
        return this.records({date: date}).get();
    }

    findById(id) {
        return this.records({id: id}).first();
    }

    days() {
        return this.records().distinct("date");
    }

    findNext(date, limit = 1) {
        return this.records()
            .get()
            .filter(record => {
                return !record.isTechnical() && moment(moment(record.date + ' ' + record.start, "YYYY-MM-DD HH:mm")).isAfter(moment(date));
            })
            .slice(0, limit);
    }
}