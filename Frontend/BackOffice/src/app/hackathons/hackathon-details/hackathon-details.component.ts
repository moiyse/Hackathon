import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HackathonsService } from "../../Core/Services/hackathons.service";
import { Hackathon } from "../../Core/Models/Hackathon";
import { HackathonThematic } from "../../Core/Models/HackathonThematic";

@Component({
  selector: "app-hackathon-details",
  templateUrl: "./hackathon-details.component.html",
  styleUrls: ["./hackathon-details.component.scss"],
})
export class HackathonDetailsComponent implements OnInit {
  id: number;
  hackathon: Hackathon= new Hackathon();

  constructor(
    private HackathonsApi: HackathonsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.id = params["id"];
        if (this.id != null) {
          this.HackathonsApi.getHackathon(this.id).subscribe(
            (res) => {
              this.hackathon = res;
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
