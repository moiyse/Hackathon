import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { environment } from "../../environments/environment";
import Swal from "sweetalert2";
import { Sponsor } from "../Core/Models/sponsor";
import { SponsorsService } from "../Core/Services/sponsors.service";

@Component({
  selector: "app-sponsors",
  templateUrl: "./sponsors.component.html",
  styleUrls: ["./sponsors.component.scss"],

})
export class SponsorsComponent implements OnInit {
  sponsors: Sponsor[] = [];
  sponsorsWithImageFiles: Sponsor[] = [];
  ACCESS_TOKEN = environment.DROPBOX_ACCESS_TOKEN;
  public imageUrl: string;
  downloadFileUrl: string;

  constructor(private http: HttpClient, private sponsorsApi: SponsorsService) {}

  ngOnInit(): void {
    this.sponsorsApi.getAllSponsors().subscribe(
      (res) => {
        this.sponsors = res;
      },
      (err) => {
        console.log(err);
      },
      () => {
        //fill the new array (sponsorsWithImageFiles);
        const headers = new HttpHeaders({
          Authorization: "Bearer " + this.ACCESS_TOKEN,
          "Content-Type": "application/json",
        });

        const url = "https://api.dropboxapi.com/2/files/get_temporary_link";
        this.sponsors.forEach((element) => {
          const path = element.imagePath;
          const requestBody = JSON.stringify({ path });
          this.http.post(url, requestBody, { headers }).subscribe(
            (response) => {
              var sponsor = new Sponsor();
              sponsor.idSponsor = element.idSponsor;
              sponsor.nom = element.nom;
              sponsor.type = element.type;
              sponsor.imagePath = response["link"];
              this.sponsorsWithImageFiles.push(sponsor);
            },
            (error) => {
              console.error(error);
            },
            () => {
              console.log(
                "sponsorsWithImageFiles rempli: ",
                this.sponsorsWithImageFiles
              );
            }
          );
        });
      }
    );
  }

  deletesponsorOnClick(id:number){
    Swal.fire({
      title: 'Are you sure want to remove this sponsor?',
      text: 'You will not be able to recover this sponsor!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      confirmButtonColor:'red',
    }).then(async (result) => {
      if (result.value) {
        //delete sponsor confirmation
        await this.deleteFunction(id);
        await this.deleteImage(id);
        Swal.fire(
          'Deleted!',
          'Your sponsor has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your sponsor is safe :)',
          'error'
        )
      }
    })

  }

  async deleteFunction(id){
    const reponse = await this.sponsorsApi.deleteSponsor(id).subscribe(
      res=>{
        let index= this.sponsorsWithImageFiles.findIndex(c=>c.idSponsor==id);
        this.sponsorsWithImageFiles.splice(index,1);
      }, error =>{
        console.log(error);
      },()=>{
      }
    )
  }

  async deleteImage(id:number){
    this.sponsorsApi.getSponsor(id).subscribe(res=>{
      const path=res.imagePath;
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.ACCESS_TOKEN}`,
          "Content-Type": "application/json"
        })
      };
      const requestBody = {
        "path": path
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
    })    
  }
}
