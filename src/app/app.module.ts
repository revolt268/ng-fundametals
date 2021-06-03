import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ToastrService } from './common/toastr.service';
import { Error404Component } from './errors/404.component';
import {
  EventsListComponent,
  EventService,
  EventListResolver,
  EventThumbnailComponent,
  EventRouteActivator,
  CreateEventComponent,
  EventDetailsComponent,
  CreateSessionsComponent,
  SessionListComponent
} from './events/index'
import { EventsAppComponent } from './events-app.component';
import { NavBarcomponent } from './nav/navbar.component';
import { appRoutes } from './routes';
import { AuthService } from './user/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavBarcomponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionsComponent,
    SessionListComponent
  ],
  providers: [
    EventService,
    ToastrService,
    EventRouteActivator,
    AuthService,
    EventListResolver,
    {
      provide: 'canDeactivateCreateEvent',
      useValue: checkDirtyState
    }
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }

export function checkDirtyState(component:CreateEventComponent){
  if (component.isDirty)
  {
    return window.confirm('You have not saved this event, do you really want to cancel?')
  }
  return true;
}
