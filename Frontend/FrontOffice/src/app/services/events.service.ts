import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Event } from '../models/Event';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private openApiUrl = environment.openApiUrl;

  constructor(private http: HttpClient) { }

  getAllEvents() {
    const url= `${this.openApiUrl}/events/Get`;
    return this.http.get<Event[]>(url);
  }

}
