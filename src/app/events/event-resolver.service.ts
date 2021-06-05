import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { EventService } from "./shared/event.service";
import { map } from 'rxjs/operators'

@Injectable()

export class EventResolver implements Resolve<any> {
  constructor(private eventService: EventService){
  }

  resolve(route: ActivatedRouteSnapshot) {
    // the id here needs to match the name given to the route's
    //  param object, this is considered a property on the param
    //  object and as such needs to match that name
    return this.eventService.getEvent(route.params['id']);
  }

}
