import React from "react";
import Talk from "../../domain/Talk";
import TechnicalScheduleItem from "./TechnicalScheduleItem";
import RegularScheduleItem from "./RegularScheduleItem";

export default function ScheduleItem(props) {
    const Component = (props.talk.type === Talk.TYPE_TECHNICAL)
        ? TechnicalScheduleItem
        : RegularScheduleItem;

    return (<Component {...props} />);
};
