import { Component, OnInit } from "@angular/core";
import { HackathonThematic } from "../Core/Models/HackathonThematic";
import { WorkshopThematic } from "../Core/Models/WorkshopThematic";
import { HackathonThematicsService } from "../Core/Services/hackathonThematic.service";
import { WorkshopThematicsService } from "../Core/Services/workshopThematic.service";

@Component({
  selector: "app-thematics",
  templateUrl: "./thematics.component.html",
  styleUrls: ["./thematics.component.scss"],
})
export class ThematicsComponent implements OnInit {
  HThematics: HackathonThematic[] = [];
  WThematics: WorkshopThematic[] = [];
  constructor(
    private HackathonThematicsApi: HackathonThematicsService,
    private WorkshopThematicsApi: WorkshopThematicsService
  ) {}

  ngOnInit(): void {
    this.HackathonThematicsApi.getAllHackathonThematics().subscribe(
      (reponse) => {
        this.HThematics = reponse;
        console.log(reponse);
      },
      (error) => {
        console.log(error);
      },
      () => {}
    );
    this.WorkshopThematicsApi.getAllWorkshopThematics().subscribe(
      (reponse) => {
        this.WThematics = reponse;
        console.log(reponse);
      },
      (error) => {
        console.log(error);
      },
      () => {}
    );
  }

  WThematicFormSubmit(WThematicForm: any) {
    this.WorkshopThematicsApi.addWorkshopThematic(WThematicForm.value).subscribe(
        reponse=>{
            console.log(reponse);
        },
        error=>{
            console.log(error);
        },
        () => {
            this.WorkshopThematicsApi.getAllWorkshopThematics().subscribe(
                reponse=>{
                    this.WThematics=reponse;
                }
            )
        }
    )
  }

  HThematicFormSubmit(HThematicForm: any) {
    this.HackathonThematicsApi.addHackathonThematic(HThematicForm.value).subscribe(
        reponse=>{
            console.log(reponse);
        },
        error=>{
            console.log(error);
        },
        () => {
            this.HackathonThematicsApi.getAllHackathonThematics().subscribe(
                reponse=>{
                    this.HThematics=reponse;
                }
            )
        }
    )
  }

  removeWThematic(id){
    const index = this.WThematics.findIndex((elem)=>elem.idWorkshopThematic===id);
    this.WThematics.splice(index, 1);
    this.WorkshopThematicsApi.deleteWorkshopThematic(id).subscribe(
        reponse=>{
            console.log(reponse);
        }
    )
  }

  removeHThematic(id){
    const index = this.HThematics.findIndex((elem)=>elem.idHackathonThematic===id);
    this.HThematics.splice(index, 1);
    this.HackathonThematicsApi.deleteHackathonThematic(id).subscribe(
        reponse=>{
            console.log(reponse)
        }
    )
  }

  updateWThematicOnBlur(event, thematic) {
    thematic.nom=event.target.innerText;
    this.WorkshopThematicsApi.updateWorkshopThematic(thematic).subscribe(
        reponse=>{
            console.log(reponse);
        }
    )
  }

  updateHThematicOnBlur(event, thematic){
    thematic.nom=event.target.innerText;
    this.HackathonThematicsApi.updateHackathonThematic(thematic).subscribe(
        reponse=>{
            console.log(reponse);
        }
    )
  }
}
