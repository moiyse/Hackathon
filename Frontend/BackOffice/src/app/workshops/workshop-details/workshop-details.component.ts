import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Workshop } from '../../Core/Models/Workshop';
import { WorkshopsService } from '../../Core/Services/workshops.service';

@Component({
  selector: 'app-workshop-details',
  templateUrl: './workshop-details.component.html',
  styleUrls: ['./workshop-details.component.scss']
})
export class WorkshopDetailsComponent implements OnInit {

  id: number;
  workshop: Workshop= new Workshop();

  constructor( private workshopsApi: WorkshopsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.id = params["id"];
        if (this.id != null) {
          this.workshopsApi.getWorkshop(this.id).subscribe(
            (res) => {
              this.workshop = res;
            },
            () => {
              console.log("error");
            },
            () => {}
          );
        }
      },
      () => {
        console.log("error");
      },
      () => {}
    );
  }

}
