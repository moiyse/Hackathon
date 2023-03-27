import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { environment } from "../../environments/environment";
import Swal from "sweetalert2";
import { Partner } from "../Core/Models/Partner";
import { PartnersService } from "../Core/Services/partners.service";

@Component({
  selector: "app-partners",
  templateUrl: "./Partners.component.html",
})
export class PartnersComponent implements OnInit {
  partners: Partner[] = [];
  partnersWithImageFiles: Partner[] = [];
  ACCESS_TOKEN = environment.DROPBOX_ACCESS_TOKEN;
  public imageUrl: string;
  downloadFileUrl: string;

  constructor(private http: HttpClient, private partnersApi: PartnersService) {}

  ngOnInit(): void {
    this.partnersApi.getAllPartners().subscribe(
      (res) => {
        this.partners = res;
      },
      (err) => {
        console.log(err);
      },
      () => {
        //populate the new array (partnersWithImageFiles);
        const headers = new HttpHeaders({
          Authorization: "Bearer " + this.ACCESS_TOKEN,
          "Content-Type": "application/json",
        });

        const url = "https://api.dropboxapi.com/2/files/get_temporary_link";
        this.partners.forEach((element) => {
          const path = element.imagePath;
          const requestBody = JSON.stringify({ path });
          this.http.post(url, requestBody, { headers }).subscribe(
            (response) => {
              var partner = new Partner();
              partner.idPartner = element.idPartner;
              partner.nom = element.nom;
              partner.imagePath = response["link"];
              this.partnersWithImageFiles.push(partner);
            },
            (error) => {
              console.error(error);
            },
            () => {
              // console.log(
              //   "partnersWithImageFiles rempli: ",
              //   this.partnersWithImageFiles
              // );
            }
          );
        });
      }
    );
  }

  deletepartnerOnClick(id:number){
    Swal.fire({
      title: 'Are you sure want to remove this partner?',
      text: 'You will not be able to recover this partner!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      confirmButtonColor:'red',
    }).then(async (result) => {
      if (result.value) {
        //delete partner confirmation
        await this.deleteFunction(id);
        //delete the image from dropbox
        await this.deleteImage(id);
        Swal.fire(
          'Deleted!',
          'Your partner has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your partner is safe :)',
          'error'
        )
      }
    })

  }

  async deleteFunction(id){
    const reponse = await this.partnersApi.deletePartner(id).subscribe(
      res=>{
        let index= this.partnersWithImageFiles.findIndex(c=>c.idPartner==id);
        this.partnersWithImageFiles.splice(index,1);
      }, error =>{
        console.log(error);
      },()=>{
      }
    )
  }

  async deleteImage(id:number){
    this.partnersApi.getPartner(id).subscribe(res=>{
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
