import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-localstorage';
import { Subscription } from 'rxjs';
import { DateServiceService } from 'src/app/Services/date-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [DateServiceService]
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = ''
  loginSubscribe!: Subscription;
  constructor(private service: DateServiceService, private router: Router) { }

  ngOnInit(): void {
    if (this.service.getStorageToken()) {
      this.router.navigate(['calendar']);
    }
     
  }

  login(): void {
    this.service.deleteStorageToken();
    this.loginSubscribe = this.service.getAuthToken(this.username, this.password).subscribe(data => {
      if (data) {
        localStorage.setItem('user', data.jwt);
        this.router.navigateByUrl('calendar');
      } 
    }, err => {
      this.errorMessage = 'Pogrešan Username ili Password';
      this.username = '';
      this.password = '';
    })
  }

  ngOnDestroy(): void {
    if (this.loginSubscribe) {
      this.loginSubscribe.unsubscribe();
    }
  }
}
