import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DateObject } from '../calendar/dateObject';
import { Reservation } from '../model/reservation';
import { DateServiceService } from '../Services/date-service.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  dateId: any;
  currentDate!: string;
  times = ['08:00-08:30', '08:30-09:00', '09:00-09:30', '09:30-10:00', '10:00-10:30', '10:30-11:00', '11:00-11:30', '11:30-12:00', '12:00-12:30', '12:30-13:00', '13:00-13:30', '13:30-14:00', '14:00-14:30', '14:30-15:00', '15:00-15:30', '15:30-16:00', '16:00-16:30', '16:30-17:00', '17:00-17:30', '17:30-18:00', '18:00-18:30', '18:30-19:00', '19:00-19:30', '19:30-20:00'];
  time: string = '';
  timeId!: number;
  barber!: string;
  reservation: Reservation;
  
  activatedRouteSubscribe!: Subscription;
  appointmentSubscribe!: Subscription;
  editAppointmentSubscribe!: Subscription;
  addAppointmentSubscribe!: Subscription;
  deleteAppointmentSubscribe!: Subscription;
  


  constructor( private service: DateServiceService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.reservation = new Reservation();
  }

  ngOnInit(): void {
    this.getTime();
    this.getAppointment();
  }

  ngOnChange(): void {
    this.getAppointment();
  }

  getTime(): void {
    //getting dateId/date from url//
    
    this.activatedRouteSubscribe = this.activatedRoute.params.subscribe(data=> {
      this.timeId = data['time'];
      this.barber = data['barber'];
      this.dateId = data['date'];
      this.time = this.times[this.timeId - 1];
    })
  }


  getAppointment(): void {
    this.appointmentSubscribe =  this.service.getAppointment(this.barber, this.dateId, Number(this.timeId)).subscribe(data => {
         this.reservation = data;
         console.log(this.reservation);
       }, err => {
        alert('Niste ulogovani');
        this.router.navigate(['login']);
       })
  }

  goBack(): void {
    this.router.navigate(['calendar/', this.dateId , this.barber]);
  }


  editReservation(): any{
    let submittedReservation = new Reservation(this.reservation);
    submittedReservation.reservationDate = this.dateId;
    submittedReservation.reservationTime = this.timeId;
    submittedReservation.barber = this.barber;

    if (submittedReservation.customer.length > 30) {
      alert('Maksimalan broj karaktera za polje "Ime i prezime" je 30!');
      return false;
    }
    if (submittedReservation.customer.length < 1) {
      alert('Minimalan broj karaktera za polje "Ime i prezime" je 1!');
      return false;
    }

    if (submittedReservation.note.length > 255) {
      alert('Maksimalan broj karaktera za polje "Opis" je 255!')
    }

    if (this.reservation && this.reservation.id){
      submittedReservation.id = this.reservation.id;

      this.editAppointmentSubscribe =  this.service.editAppointment(this.barber, this.dateId, Number(this.timeId), submittedReservation).subscribe(data=>{
        alert('Uspiješno ste izmijenili rezervaciju');
        this.goBack();
      }, err => {
        alert('Rezervacija nije uspiješno izmijenjena');
      })
    } else {
      this.addAppointmentSubscribe = this.service.addAppointment(this.barber, this.dateId, Number(this.timeId), submittedReservation).subscribe(data=>{
        alert('Uspiješno ste dodali rezervaciju');
        this.goBack();
      }, err => {
        alert('Rezervacija nije uspiješno dodata');
      })
    }
  }

  deleteAppointment(): void {
    this.deleteAppointmentSubscribe = this.service.deleteAppointment(this.barber, this.dateId, Number(this.timeId)).subscribe(data => {
      alert('Uspiješno ste izbrisali rezervaciju');
      this.goBack();
    }, err => {
      alert('Rezervacija nije uspiješno izbrisana');
      this.goBack();
    })
  }


  ngOnDestroy(): void {
    if (this.activatedRouteSubscribe) {
      this.activatedRouteSubscribe.unsubscribe();
    }

    if (this.appointmentSubscribe) {
      this.appointmentSubscribe.unsubscribe();
    }

    if (this.addAppointmentSubscribe) {
      this.appointmentSubscribe.unsubscribe();
    }

    if (this.editAppointmentSubscribe) {
      this.appointmentSubscribe.unsubscribe();
    }

    if (this.deleteAppointmentSubscribe) {
      this.deleteAppointmentSubscribe.unsubscribe();
    }
    
  }

  
}
