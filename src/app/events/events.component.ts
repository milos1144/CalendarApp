import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  Subscription } from 'rxjs';
import { DateServiceService } from '../Services/date-service.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  dateId: any;
  currentDateString!: string;
  currentDate = new Date();
  barberSelect!: string;
  routeSubscribe!: Subscription;
  reservationSubscribe!: Subscription;
  
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private service: DateServiceService) { 
    this.getURL();
  
  }

  ngOnInit(): void {
   }

  getURL(): void {
    //getting dateId/date from url/detect url change//
    this.routeSubscribe = this.activatedRoute.params.subscribe(data=> {
      this.currentDateString = data['date'];
      if (data['barber']) {
        this.barberSelect = data['barber'];
        this.getReservationsForBarber(this.barberSelect);
      }
      this.checkURL();
    })
  }

  checkURL() {
    //validating date in url//c
    let split = String(this.currentDateString).split('-');
    if (/^([0-3][0-9][-][0-1][0-9][-][0-9][0-9][0-9][0-9])$/.test(this.currentDateString) === false || this.currentDateString.length !== 10 || Number(split[0]) > 31 || Number(split[0]) <= 0 || Number(split[1]) > 12 || Number(split[1]) <= 0) {
      alert('Pogrešan datum');
      this.router.navigateByUrl('calendar');
    }
    if (this.barberSelect) {
      if (this.barberSelect !== 'darko' && this.barberSelect !== 'milos' && this.barberSelect !== 'milan'){
        alert('Frizer ne postoji');
        this.goToCalendar();
      }
    }
  }

  goToCalendar(): void {
    let month = String(this.currentDateString).slice(3,5);
    let year = String(this.currentDateString).slice(6, String(this.currentDateString).length);
    this.service.setCurrent(month, year);
    this.router.navigateByUrl('calendar');
  }


  getReservationsForBarber(barber: string):void {
   this.reservationSubscribe =  this.service.getReservationsForDate(this.currentDateString, barber).subscribe(data => {
      let ps = document.querySelectorAll('p');
      ps.forEach(p => {
         p.innerText = '';
        for (let res of data) {
          if (Number(p.id) === Number(res.reservationTime)) {
            p.innerText = res.customer + ' - ' + res.note.replace(/(\n)/gm, " ");
          }
        }
      })

      let reservations = document.querySelectorAll('.reservation button');
      reservations.forEach(res => {
        res.classList.remove('reserved');
        if (res.nextSibling?.textContent) {
          res.classList.add('reserved');
        }
      })
    }, err => {
      this.service.deleteStorageToken();
      alert('Niste ulogovani');
      this.router.navigate(['login']);
    })
  }

  navigateToBarber(barber: string, date: string): void {
    this.router.navigateByUrl(`calendar/${date}/${barber}`);
  }

  dayPrevNext(prevOrNext: number): void {
    let dateString = this.currentDateString.split('-');
    this.currentDate.setDate(Number(dateString[0]));
    this.currentDate.setMonth(Number(dateString[1]) - 1);
    this.currentDate.setFullYear(Number(dateString[2]));

    if (prevOrNext) {
      this.currentDate.setDate(this.currentDate.getDate() + 1);
    } else {
      this.currentDate.setDate(this.currentDate.getDate() - 1);
    }

    let newDateString = `${this.addZero(this.currentDate.getDate())}-${this.addZero(this.currentDate.getMonth() + 1)}-${this.currentDate.getFullYear()}`;


    if (this.barberSelect) {
       this.navigateToBarber(this.barberSelect, newDateString);  
    } else {
      this.navigateToBarber('', newDateString);
    }

  }

  addZero(d: any) {
    return (d < 10) ? '0' + d.toString() : d.toString();
  }

  ngOnDestroy(): void {
     if (this.routeSubscribe) {
      this.routeSubscribe.unsubscribe();
     }
    
     if (this.reservationSubscribe) {
      this.reservationSubscribe.unsubscribe();
     }
  }

}
