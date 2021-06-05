import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { JQ_TOKEN,
        TOASTR_TOKEN,
        Toastr,
        CollapsibleWellComponent,
        SimpleModalComponent,
        ModalTriggerDirective } from './common/index';
import { Error404Component } from './errors/404.component';
import {
  EventsListComponent,
  EventService,
  EventListResolver,
  EventThumbnailComponent,
  CreateEventComponent,
  EventDetailsComponent,
  CreateSessionsComponent,
  SessionListComponent,
  DurationPipe,
  UpvoteComponent,
  VoterService,
  LocationValidator,
  EventResolver
} from './events/index'
import { EventsAppComponent } from './events-app.component';
import { NavBarcomponent } from './nav/navbar.component';
import { appRoutes } from './routes';
import { AuthService } from './user/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

let toastr:Toastr = window['toastr'];
let jQuery = window['$'];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
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
    SessionListComponent,
    CollapsibleWellComponent,
    SimpleModalComponent,
    ModalTriggerDirective,
    UpvoteComponent,
    LocationValidator,
    DurationPipe
  ],
  providers: [
    EventService,
    { provide: TOASTR_TOKEN, useValue: toastr },
    { provide: JQ_TOKEN, useValue: jQuery },
    EventResolver,
    AuthService,
    VoterService,
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
