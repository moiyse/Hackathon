import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Event } from '../Models/Event';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  getAllEvents() {
    return this.http.get<Event[]>(environment.endpoints.Events.GetAll);
  }

  addEvent(Event: Event) {
    return this.http.post<Event>(
      environment.endpoints.Events.post,
      Event
    );
  }

  deleteEvent(id: number) {
    return this.http.delete<any>(environment.endpoints.Events.delete + id);
  }

  updateEvent(Event: Event) {
    return this.http.put<Event>(
      environment.endpoints.Events.update,
      Event
    );
  }

  getEvent(id: number) {
    return this.http.get<Event>(environment.endpoints.Events.get + id);
  }

}
