import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEventComponent } from './add-event/add-event.component';
import { AdminGuardGuard } from './admin-guard.guard';
import { CalendarComponent } from './calendar/calendar.component';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from './login/login/login.component';
/:barber/
const routes: Routes = [
  {path: 'calendar', component: CalendarComponent, canActivate: [AdminGuardGuard]},
  {path: 'calendar/:date', component: EventsComponent, canActivate: [AdminGuardGuard]},
  {path: 'calendar/:date/:barber', component: EventsComponent, canActivate: [AdminGuardGuard]},
  {path: 'calendar/:date/:barber/:time', component: AddEventComponent, canActivate: [AdminGuardGuard]},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
