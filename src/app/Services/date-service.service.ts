import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../login/login/user';
import { Reservation } from '../model/reservation';


const apiUrl = 'http://localhost:8080/api/';
const loginUrl = 'http://localhost:8080/api/login';

@Injectable({
  providedIn: 'root'
})
export class DateServiceService {
   
  currDay = new Date();

  current = {
    currMonth: this.currDay.getMonth(),
    currYear: this.currDay.getFullYear()
  }

  user: User = new User;

 
  constructor(private http: HttpClient) { 
    
  }

  getCurrent(): Object {
    return this.current;
  }

  setCurrent(month: any, year: any) {
    this.current.currMonth = month - 1;
    this.current.currYear = year;
    this.getCurrent();
  }


  getAuthToken(username: any, password: any): Observable<any> {
    return this.http.post<User>(loginUrl, {username: username, password: password}).pipe(map(data => {
      return data;
    }));
  }

  getStorageToken() {
    return localStorage.getItem('user');
  }

  deleteStorageToken() {
    return localStorage.removeItem('user');
  }





  getAllReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${apiUrl}reservations`);
  }

  getReservationsForDate(day: string, barber: string): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${apiUrl}barbersdate?barber=${barber}&reservationDate=${day}`);
  }

  getAppointment(barber: string, day: string, time: number): Observable<Reservation> {
    return this.http.get(`${apiUrl}appointment?barber=${barber}&reservationDate=${day}&reservationTime=${time}`).pipe(map(data => {
      return new Reservation(data);
    }))
  }

  addAppointment(barber: string, day: string, time: number, reservation: Reservation): Observable<Reservation> {
    return this.http.post(`${apiUrl}appointment?barber=${barber}&reservationDate=${day}&reservationTime=${time}`, reservation).pipe(map(data => {
      return new Reservation(data);
    }))
  }

  editAppointment(barber: string, day: string, time: number, reservation: Reservation): Observable<Reservation> {
    return this.http.put(`${apiUrl}appointment?barber=${barber}&reservationDate=${day}&reservationTime=${time}`, reservation).pipe(map(data => {
      return new Reservation(data);
    }))
  }

  deleteAppointment(barber: string, day: string, time: number): Observable<Reservation> {
    return this.http.delete(`${apiUrl}appointment?barber=${barber}&reservationDate=${day}&reservationTime=${time}`).pipe(map(data => {
      return new Reservation(data);
    }))
  }

  getDummy():Observable<Boolean>{
    return this.http.get(`${apiUrl}dummy`).pipe(map(data =>{
      return true;
    }))
  }

}
