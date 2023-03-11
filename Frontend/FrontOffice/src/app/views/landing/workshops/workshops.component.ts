import { Component, OnInit } from '@angular/core';
import { Workshop } from 'src/app/models/Workshop';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { WorkshopService } from 'src/app/services/workshop.service';

@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.css']
})
export class WorkshopsComponent implements OnInit {

  list: Workshop[]=[];
  token: any;

  constructor(private workshopsApi: WorkshopService, private tokenStorage:TokenStorageService) { 
    this.token= this.tokenStorage.getToken();
  }

  ngOnInit(): void {
    this.workshopsApi.getAllWorkshops().subscribe(
      response=>{
        this.list=response;
      },
      error=>{
        console.log(error)
      },
      ()=>{}
    )
  }

}
