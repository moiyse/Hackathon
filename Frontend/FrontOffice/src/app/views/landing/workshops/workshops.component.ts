import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { Workshop } from 'src/app/models/Workshop';
import { ReservationService } from 'src/app/services/reservation.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
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
  user!:User;

  constructor(
    private workshopsApi: WorkshopService,
    private tokenStorage: TokenStorageService,
    private resrevationApi: ReservationService,
    private userService:UserService
  ) {
    this.token = this.tokenStorage.getToken();
  }

  ngOnInit(): void {
    this.userService.getUserByEmail(this.tokenStorage.getUser()).subscribe(data => {
      this.user = data
    })
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
    this.resrevationApi.reserverWorkshop(idWorkshop,this.user.idUser).subscribe(
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
