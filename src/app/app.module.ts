import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { EventsAppComponent } from './events-app.component';
import { EventThumbnailComponent } from './events/event-thumbnail.component';
import { EventListComponent } from './events/events-list.components';
import { EventService } from './events/shared/event.service';
import { NavBarcomponent } from './nav/navbar.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    EventsAppComponent,
    EventListComponent,
    EventThumbnailComponent,
    NavBarcomponent
  ],
  providers: [EventService],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }
