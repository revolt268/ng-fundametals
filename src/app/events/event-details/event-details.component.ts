import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ISession } from "../shared";
import { EventService } from "../shared/event.service";

@Component({
  templateUrl: './event-details.component.html',
  styles: [`
    .container {padding-left: 20px; padding-right: 20px; }
    .event-image {height: 100px; }
    a {cursor: pointer}
  `]
})

export class EventDetailsComponent implements OnInit {
  addMode:boolean;
  event:any;
  filterBy: string = 'all';
  
  constructor(private eventService:EventService,
              private route:ActivatedRoute){

  }
  ngOnInit(): void {
    // the + here casts the results to a number
    this.event = this.eventService.getEvent(+this.route.snapshot.params['id']);
  }

  addSession(){
    this.addMode = true;
  }

  saveNewSession(session:ISession){
    const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id));

    session.id = nextId + 1;
    this.event.sessions.push(session);
    this.eventService.updateEvent(this.event);
    this.addMode = false;
  }

  cancelAddSession() {
    this.addMode = false;
  }
}
