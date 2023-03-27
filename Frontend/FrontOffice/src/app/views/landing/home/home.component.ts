import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/Event';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  list: Event[]=[];
  
  constructor(private eventsApi: EventsService){}

  ngOnInit(): void {
    this.eventsApi.getAllEvents().subscribe(
      res=>{
        this.list=res;
        console.log("res: ",res);
        console.log("list: ",this.list)
      }
    )
  }

  getDuration(start: Date, end: Date) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diff = Math.abs(endDate.getTime() - startDate.getTime());
    const minutes = Math.floor(diff / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}H, ${remainingMinutes}min`;
  }
  

}
