import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AddEventComponent } from './add-event/add-event.component';
import { LoginComponent } from './login/login/login.component';
import { DateServiceService } from './Services/date-service.service';
import { TokenInterceptorService } from './token-interceptor.service';
import { AdminGuardGuard } from './admin-guard.guard';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { EventsComponent } from './events/events.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';




@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    AddEventComponent,
    LoginComponent,
    EventsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule
  ],
  providers: [DateServiceService, AdminGuardGuard,
  {provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptorService,
  multi: true
}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
