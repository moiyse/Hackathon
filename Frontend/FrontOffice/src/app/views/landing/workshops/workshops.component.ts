import { Component, OnInit } from '@angular/core';
import { Workshop } from 'src/app/models/Workshop';
import { ReservationService } from 'src/app/services/reservation.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { WorkshopService } from 'src/app/services/workshop.service';

@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.css'],
})
export class WorkshopsComponent implements OnInit {
  alert: String;
  list: Workshop[] = [];
  token: any;

  constructor(
    private workshopsApi: WorkshopService,
    private tokenStorage: TokenStorageService,
    private resrevationApi: ReservationService
  ) {
    this.token = this.tokenStorage.getToken();
  }

  ngOnInit(): void {
    this.workshopsApi.getAllWorkshops().subscribe(
      (response) => {
        this.list = response;
      },
      (error) => {
        console.log(error);
      },
      () => {}
    );
  }

  reserverWorkshop(idWorkshop:number){
    console.log("the id of workshop to reservation is : ",idWorkshop);
    this.resrevationApi.reserverWorkshop(idWorkshop).subscribe(
      (response)=>{
        console.log("response returned from server: ", response);
        this.alert = JSON.stringify(response);
      },
      (error) => {
        console.log(error);
      },
      () => {}
    )
  }
}
