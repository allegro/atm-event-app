import TAFFY from 'taffy';
import ScheduleRecord from "../Views/Schedule/ScheduleRecord";
import moment from 'moment';
import { EventEmitter } from 'events';

class ScheduleRepository extends EventEmitter {

    constructor() {
        super();
        this.records = TAFFY();
    }

    connectWith(firebaseRef) {
        firebaseRef.on('value', scheduleData => {
            const records = scheduleData.val().map(item => item.agenda
                .map(record => new ScheduleRecord(item.date, record.start, record.end, record.title, record.content, record.speaker, record.photo)))
                .reduce((a, b) => a.concat(b));

            this.records = TAFFY(records);
            this.emit('change');
        });
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
                return !record.isTechnical() && moment(record.date).isAfter(moment(date));
            })
            .slice(0, limit);
    }
}

export default new ScheduleRepository();