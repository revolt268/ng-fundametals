import { Component } from "@angular/core";
import { EventService } from "./shared/event.service";

@Component({
  selector: 'events-list',
  template: `
  <div>
    <h1>Upcoming angular Events</h1>
    <hr/>
    <div class="row">
      <div *ngFor="let event of events" class="col-md-5">
        <event-thumbnail [event]="event"></event-thumbnail>
      </div>
    </div>
  </div>
  `
})

export class EventListComponent {
  events:any[];
  constructor(private eventService: EventService){
    this.events = this.eventService.getEvents();
  }
}
