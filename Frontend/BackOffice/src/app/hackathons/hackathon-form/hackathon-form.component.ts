import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HackathonsService } from "../../Core/Services/hackathons.service";
import { HackathonThematicsService } from "../../Core/Services/hackathonThematic.service";
import { Hackathon } from "../../Core//Models/Hackathon";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { ActivatedRoute, Router } from "@angular/router";
import { HackathonThematic } from "../../Core/Models/HackathonThematic";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";

@Component({
  selector: "app-hackathon-form",
  templateUrl: "./hackathon-form.component.html",
  styleUrls: ["./hackathon-form.component.scss"],
})
export class hackathonFormComponent implements OnInit {
  id: number;
  hackathon: Hackathon= new Hackathon();
  HackathonForm: FormGroup;
  action: string;
  public editor = ClassicEditor;
  hackathonThematics: HackathonThematic[] = [];

  constructor(
    private HackathonsApi: HackathonsService,
    private hackathonThematicApi: HackathonThematicsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    //initialise Hackathon Form
    this.HackathonForm = new FormGroup({
      idHackathon: new FormControl(""),
      nom: new FormControl("", Validators.required),
      description: new FormControl(""),
      dateDebut: new FormControl("", Validators.required),
      dateFin: new FormControl("", Validators.required),
      nbrMaxEquipe: new FormControl("", Validators.required),
      thematic: new FormGroup({
        idHackathonThematic: new FormControl(""),
        nom: new FormControl(""),
      }),
    });

    //get all workshop thematics
    this.hackathonThematicApi.getAllHackathonThematics().subscribe((res) => {
      this.hackathonThematics = res;
    });

    this.route.params.subscribe(
      (params) => {
        this.id = params["id"];
        if (this.id != null) {
          this.action = "update";
          this.HackathonsApi.getHackathon(this.id).subscribe(
            (res) => {
              this.hackathon = res;

              this.HackathonForm.setValue({
                idHackathon: this.hackathon.idHackathon,
                nom: this.hackathon.nom,
                description: this.hackathon.description,
                dateDebut: this.hackathon.dateDebut,
                dateFin: this.hackathon.dateFin,
                nbrMaxEquipe: this.hackathon.nbrMaxEquipe,
                thematic: {
                  idHackathonThematic:
                    this.hackathon.thematic.idHackathonThematic,
                  nom: this.hackathon.thematic.nom,
                },
              });
            },
            () => {
              console.log("error");
            },
            () => {}
          );
        } else {
          this.action = "new";
          this.hackathon = new Hackathon();
        }
      },
      () => {
        console.log("error");
      },
      () => {}
    );
  }

  onSubmit() {
    if (this.action == "new") {
      this.HackathonsApi.addHackathon(this.HackathonForm.value).subscribe(
        (res) => {},
        (error) => {
          console.log(error);
        },
        async () => {
          await this.alertAddWithSuccess();
          this.router.navigate(["hackathons"]);
        }
      );
    } else if (this.action == "update") {
      console.log(this.HackathonForm.value);
      this.HackathonsApi.updateHackathon(this.HackathonForm.value).subscribe(
        (res) => {},
        (error) => {
          console.log(error);
        },
        async () => {
          await this.alerUpdatetWithSuccess();
          this.router.navigate(["hackathons"]);
        }
      );
    }
  }

  async alertAddWithSuccess() {
    const msg = await Swal.fire(
      "DONE",
      "Your Hackathon added successfully!",
      "success"
    );
  }

  async alerUpdatetWithSuccess() {
    const msg = await Swal.fire(
      "DONE",
      "Your Hackathon updated successfully!",
      "success"
    );
  }
}
