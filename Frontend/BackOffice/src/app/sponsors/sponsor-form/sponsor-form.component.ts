import { HttpClient, HttpHeaders, HttpEventType } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SponsorsService } from "../../Core/Services/sponsors.service";
import { Sponsor } from "../../Core/Models/sponsor";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-sponsor-form",
  templateUrl: "./sponsor-form.component.html",
  styleUrls: ["./sponsor-form.component.scss"],
})
export class SponsorFormComponent implements OnInit {
  id: number;
  sponsor: Sponsor = new Sponsor();
  sponsorForm: FormGroup;
  action: string;
  imageBase64: string;
  selectedFile: File = null;
  imageSrc: string;
  ACCESS_TOKEN = environment.DROPBOX_ACCESS_TOKEN;
  isLoading: boolean = false;
  progress: number = 0;

  constructor(
    private http: HttpClient,
    private sponsorApi: SponsorsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //initialise sponsor Form
    this.sponsorForm = new FormGroup({
      idsponsor: new FormControl(""),
      nom: new FormControl("", Validators.required),
      imagePath: new FormControl("", Validators.required),
      type: new FormControl("", Validators.required),
    });

    this.route.params.subscribe((params) => {
      this.id = params["id"];
      if (this.id != null) {
        this.action = "update";
        this.sponsorApi.getSponsor(this.id).subscribe(
          (res) => {
            this.sponsor = res;
            this.sponsorForm.setValue({
              idsponsor: this.sponsor.idSponsor,
              nom: this.sponsor.nom,
              imagePath: this.sponsor.imagePath,
              type: this.sponsor.type,
            });
            this.getDropBoxImagePath(this.sponsor.imagePath);
          },
          () => {
            console.log("error");
          },
          () => {}
        );
      } else {
        this.action = "new";
        this.sponsor = new Sponsor();
      }
    });
  }

  chooseFileOnClick() {
    const fileInput = document.getElementById("file");
    fileInput.click();
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = <File>event.target.files[0];
      console.log(this.selectedFile);
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }
  }

  onSubmit() {
    if (this.action == "new") {
      this.isLoading = true;
      const path = "/sponsors/" + this.selectedFile.name;
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/octet-stream",
          Authorization: `Bearer ${this.ACCESS_TOKEN}`,
          "Dropbox-API-Arg": JSON.stringify({
            path: path,
            mode: "add",
            autorename: true,
            mute: false,
          }),
        }),
      };
      this.http
        .post(
          "https://content.dropboxapi.com/2/files/upload",
          this.selectedFile,
          { ...httpOptions, reportProgress: true, observe: "events" }
        )
        .subscribe(
          (event) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event.type === HttpEventType.Response) {
              this.sponsorForm.controls["imagePath"].setValue(
                "/sponsors/" + this.selectedFile.name
              );
              this.sponsorApi.addSponsor(this.sponsorForm.value).subscribe(
                (response) => {
                  console.log(response);
                },
                (err) => {},
                () => {
                  this.isLoading = false;
                  this.router.navigate(["sponsors"]);
                }
              );
            }
          },
          (err) => {
            console.log(err);
          }
        );
    } else if (this.action == "update") {
      this.isLoading = true;
      const path = "/sponsors/" + this.selectedFile.name;
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/octet-stream",
          Authorization: `Bearer ${this.ACCESS_TOKEN}`,
          "Dropbox-API-Arg": JSON.stringify({
            path: path,
            mode: "add",
            autorename: true,
            mute: false,
          }),
        }),
      };
      this.http
        .post(
          "https://content.dropboxapi.com/2/files/upload",
          this.selectedFile,
          { ...httpOptions, reportProgress: true, observe: "events" }
        )
        .subscribe(
          (event) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event.type === HttpEventType.Response) {
              this.sponsorForm.controls["imagePath"].setValue(
                "/sponsors/" + this.selectedFile.name
              );
              this.sponsorApi.updateSponsor(this.sponsorForm.value).subscribe(
                (response) => {
                  console.log(response);
                },
                (err) => {},
                () => {
                  this.isLoading = false;
                  this.router.navigate(["sponsors"]);
                }
              );
            }

            //delete the previous image from dropbox
            const path = this.sponsor.imagePath;
            const httpOptions = {
              headers: new HttpHeaders({
                Authorization: `Bearer ${this.ACCESS_TOKEN}`,
                "Content-Type": "application/json",
              }),
            };
            const requestBody = {
              path: path,
            };
            this.http
              .post(
                "https://api.dropboxapi.com/2/files/delete_v2",
                requestBody,
                httpOptions
              )
              .subscribe(
                (response) => {
                  console.log(response);
                },
                (err) => {
                  console.log(err);
                }
              );
          },
          (err) => {
            console.log(err);
          },
          () => {
            this.isLoading = false;
            this.router.navigate(["sponsors"]);
          }
        );
    }
  }

  getDropBoxImagePath(imagePath: string) {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.ACCESS_TOKEN,
      "Content-Type": "application/json",
    });

    const url = "https://api.dropboxapi.com/2/files/get_temporary_link";
    const path = imagePath;
    const requestBody = JSON.stringify({ path });

    this.http.post(url, requestBody, { headers }).subscribe(
      (response) => {
        this.imageSrc = response["link"];
      },
      (error) => {
        console.error(error);
      },
      () => {}
    );
  }
}
