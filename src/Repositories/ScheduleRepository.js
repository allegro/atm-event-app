import TAFFY from 'taffy';
import schedule from './schedule.json';
import ScheduleRecord from "../Views/Schedule/ScheduleRecord";
import moment from 'moment';

const records = TAFFY(schedule.map(item => item.agenda
    .map(record => new ScheduleRecord(item.date, record.start, record.end, record.title, record.content, record.speaker, record.photo)))
    .reduce((a, b) => a.concat(b)));

export default class ScheduleRepository {
    static findAll(date) {
        return records({date: date}).get();
    }

    static findById(id) {
        return records({id: id}).first();
    }

    static days() {
        return records().distinct("date");
    }

    static findNext(date, limit = 1) {
        return records()
            .get()
            .filter(record => {
                return !record.isTechnical() && moment(record.date).isAfter(moment(date));
            })
            .slice(0, limit);
    }
}