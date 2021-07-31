import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DateServiceService } from '../Services/date-service.service';
import { DateObject } from './dateObject';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  date = new Date();
  currentDate = new Date();
  months = [
    'Januar',
    'Februar',
    'Mart',
    'April',
    'Maj',
    'Jun',
    'Jul',
    'Avgust',
    'Septembar',
    'Oktobar',
    'Novembar',
    'Decembar'
  ];

  days: DateObject[] = [];
  prevDays: Number[] = [];
  nextDays: Number[] = [];

  current: any;
  dateObjects: DateObject[] = []; 
  markCurrentDay!: string; 

  constructor(private service: DateServiceService,private router: Router) {
    //getting current date from the service after add-event route (same month and year after add event-route)
    this.current = this.service.getCurrent();
    this.markCurrentDay = `${this.addZero(this.date.getDate())}-${this.addZero(this.date.getMonth() + 1)}-${this.date.getFullYear()}`;
  }

  ngOnInit(): void {
    this.setMonthAndYear(this.current.currMonth, this.current.currYear);
    this.getDummy();
  }

  getDays(): void {
    //generating dates//
    let lastDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
    let copyDays = [];

    for (let i = 1; i <= lastDay; i++) {

      let newDateObj = {
        dateString: this.addZero(i).toString() + '-' + this.addZero(this.date.getMonth() + 1).toString() + '-' + this.date.getFullYear().toString(),
    
      }
      
      let object = new DateObject(newDateObj);
      let objects = new DateObject(object);
      copyDays.push(objects);
    }

    if (this.days.length === 0) {
      this.days = [...copyDays];
    } else {
      this.days = [];
      this.days = [...copyDays];
    }

  }

  toAddEvent(date: String): void {
    this.router.navigate(['calendar/' + date]);
  }

  getPrevDays(): void {
    //generating previous days//
    let firstDayIndex = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay() - 1;
    if (firstDayIndex === -1) {
      firstDayIndex = 6;
    }
    let prevLastDay = new Date(this.date.getFullYear(), this.date.getMonth(),0).getDate();
    let copyPrevDays = [];
    

    for (let i = firstDayIndex; i > 0; i--) {
      copyPrevDays.push(prevLastDay - i + 1);
    }

    if (this.prevDays.length === 0) {
      this.prevDays = [...copyPrevDays];
    } else {
      this.prevDays = [];
      this.prevDays = [...copyPrevDays];
    }

  }

  prevNextMonth(prevOrNext: Number): void {
    if (prevOrNext) {
      this.date.setMonth(this.date.getMonth() + 1);
    } else {
      this.date.setMonth(this.date.getMonth() - 1);
    }
    this.getDays();
    this.getPrevDays();
  }


  setMonthAndYear(month: number, year: number): void {
    this.date.setMonth(Number(month));
    this.date.setFullYear(Number(year));
    this.getDays();
    this.getPrevDays();
  }

  addZero(d: any) {
    return (d < 10) ? '0' + d.toString() : d.toString();
  }


  logout() {
    this.service.deleteStorageToken();
    this.router.navigateByUrl('login')
  }

  getDummy(){
    this.service.getDummy().subscribe(data => {
      console.log(data)
    }, err => {
      alert('Niste ulogovani');
      this.router.navigate(['login']);
      this.service.deleteStorageToken();
    });
  }

}
