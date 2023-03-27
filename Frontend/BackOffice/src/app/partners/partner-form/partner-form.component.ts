import { HttpClient, HttpHeaders, HttpEventType } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { PartnersService } from "../../Core/Services/partners.service";
import { Partner } from "../../Core/Models/Partner";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../environments/environment";
@Component({
  selector: "app-partner-form",
  templateUrl: "./partner-form.component.html",
  styleUrls: ["./partner-form.component.scss"],
})
export class PartnerFormComponent implements OnInit {
  id: number;
  partner: Partner = new Partner();
  partnerForm: FormGroup;
  action: string;
  imageSrc: string;
  selectedFile: File = null;
  ACCESS_TOKEN = environment.DROPBOX_ACCESS_TOKEN;
  isLoading: boolean = false;
  progress: number = 0;

  constructor(
    private http: HttpClient,
    private partnerApi: PartnersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //initialise partner Form
    this.partnerForm = new FormGroup({
      idpartner: new FormControl(""),
      nom: new FormControl("", Validators.required),
      imagePath: new FormControl("", Validators.required),
    });

    this.route.params.subscribe((params) => {
      this.id = params["id"];
      if (this.id != null) {
        this.action = "update";
        this.partnerApi.getPartner(this.id).subscribe(
          (res) => {
            this.partner = res;
            this.partnerForm.setValue({
              idpartner: this.partner.idPartner,
              nom: this.partner.nom,
              imagePath: this.partner.imagePath,
            });
            this.getDropBoxImagePath(this.partner.imagePath);
          },
          () => {
            console.log("error");
          },
          () => {}
        );
      } else {
        this.action = "new";
        this.partner = new Partner();
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
      const path = "/partners/" + this.selectedFile.name;
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
              this.partnerForm.controls["imagePath"].setValue(
                "/partners/" + this.selectedFile.name
              );
              this.partnerApi.addPartner(this.partnerForm.value).subscribe(
                (response) => {
                  console.log(response);
                },
                (err) => {},
                () => {
                  this.isLoading = false;
                  this.router.navigate(["partners"]);
                }
              );
            }
          },
          (err) => {
            console.log(err);
          },
          () => {
            this.isLoading = false;
            this.router.navigate(["partners"]);
          }
        );
    } else if (this.action == "update") {
      this.isLoading = true;
      const path = "/partners/" + this.selectedFile.name;
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
              this.partnerForm.controls["imagePath"].setValue(
                "/partners/" + this.selectedFile.name
              );
              this.partnerApi.updatePartner(this.partnerForm.value).subscribe(
                (response) => {
                  console.log(response);
                },
                (err) => {},
                () => {
                  this.isLoading = false;
                  this.router.navigate(["partners"]);
                }
              );
            }

            //delete the previous image from dropbox
            const path = this.partner.imagePath;
            console.log("path: ", path);
            console.log();
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
