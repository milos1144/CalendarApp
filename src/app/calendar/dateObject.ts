export class DateObject {
    dateString: string;

    constructor (obj?: any) {
        this.dateString = obj && obj.dateString || '';
    }
}