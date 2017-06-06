const ten = i => (i < 10 ? "0" : "") + i;

function getDateParts(date) {
    const YYYY = date.getFullYear();
    const MM = ten(date.getMonth() + 1);
    const DD = ten(date.getDate());
    const HH = ten(date.getHours());
    const II = ten(date.getMinutes());
    const SS = ten(date.getSeconds());

    return { YYYY, MM, DD, HH, II, SS };
}

export function toDatetimeLocalPretty(dateOrTimestamp = 0) {
    const date = dateOrTimestamp instanceof Date ? dateOrTimestamp : new Date(dateOrTimestamp);
    const { YYYY, MM, DD, HH, II } = getDateParts(date);

    return isNaN(date) ? "" : `${DD}/${MM}/${YYYY} ${HH}:${II}`;
}

export function toTimeLocal(dateOrTimestamp = 0) {
    const date = dateOrTimestamp instanceof Date ? dateOrTimestamp : new Date(dateOrTimestamp);
    const { HH, II } = getDateParts(date);

    return isNaN(date) ? "" : `${HH}:${II}`;
}
