import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
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
  sortBy: string = 'votes';

  constructor(private eventService:EventService,
              private route:ActivatedRoute){

  }
  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.event = this.eventService.getEvent(+params['id']);
      // When changing the route parameter we need to also change the state
      //  for example the Add mode here needs to go back to false
      //  when we change to another event, you may need to do this
      //  for other states as well such as teh filters
      this.addMode = false;
    })
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
