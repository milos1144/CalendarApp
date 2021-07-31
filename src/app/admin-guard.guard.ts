import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DateServiceService } from './Services/date-service.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {
  
  constructor(private service: DateServiceService, private router: Router) {
  }

  canActivate(): boolean {
    if (this.service.getStorageToken()) {
      return true;
    } else {
      alert('Niste ulogovani');
      this.router.navigate(['login']);
      return false;
    }
  }

}