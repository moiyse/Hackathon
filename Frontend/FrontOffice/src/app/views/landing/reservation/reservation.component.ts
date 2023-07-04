import { Component, OnInit } from '@angular/core';
import { Workshop } from 'src/app/models/Workshop';
import { WorkshopService } from '../../../services/workshop.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  idUser:any;
  list: Workshop[]=[];
  reservationsAvailable = false;

  constructor(private workshopsApi:WorkshopService) { }

  ngOnInit(): void {
    this.idUser= localStorage.getItem('idUser');
    this.workshopsApi.getUserWorkshops(this.idUser).subscribe(
      (response) => {
        this.list = response;
        this.reservationsAvailable = true;
      },
      (error) => {
        this.reservationsAvailable = false
        console.log(error);
      },
      () => {}
    );
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
