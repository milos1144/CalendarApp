export class Reservation {
    id: number;
    customer: string;
    note: string;
    reservationDate: string;
    reservationTime: number;
    barber: string;

    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.customer = obj && obj.customer || '';
        this.note = obj && obj.note || '';
        this.reservationDate = obj && obj.reservationDate || '';
        this.reservationTime = obj && obj.reservationTime || '';
        this.barber = obj && obj.barber || '';
    }
    
}