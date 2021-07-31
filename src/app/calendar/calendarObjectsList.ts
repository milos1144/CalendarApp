import { DateObject } from "./dateObject";

export class CalendarObjectList {
    results: DateObject[];

    constructor(obj?: any) {
        this.results = obj && obj;
    }
}