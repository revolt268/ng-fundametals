
import { Routes } from "@angular/router";
import { Error404Component } from "./errors/404.component";
import {
  CreateEventComponent,
  EventDetailsComponent,
  EventListResolver,
  EventsListComponent,
  CreateSessionsComponent,
  EventResolver
} from "./events/index"


export const appRoutes:Routes = [
  { path: 'events/new', component: CreateEventComponent,
    canDeactivate: ['canDeactivateCreateEvent']},
  { path: 'events', component: EventsListComponent,
    resolve: {events:EventListResolver} },
    // the id here is the name of the param which makes a property on
    //  the param object and as such should be used when calling it
    //  look at the event-resolver.service.ts where this is used
  { path: 'events/:id', component: EventDetailsComponent,
      resolve: {event:EventResolver} },
  { path: 'events/session/new', component: CreateSessionsComponent},
  { path: '404', component: Error404Component},
  { path: '', redirectTo: '/events', pathMatch: 'full'},
  {
    path: 'user',
    loadChildren: () => import('./user/user.module')
      .then(m => m.UserModule)
  }
]
