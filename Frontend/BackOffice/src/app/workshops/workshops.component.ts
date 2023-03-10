import { Component, OnInit } from '@angular/core';
import { Workshop } from '../Core/Models/Workshop';
import { WorkshopsService } from '../Core/Services/workshops.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.scss']
})
export class WorkshopsComponent implements OnInit {

  list:Workshop[]=[];

  constructor(private workshopsApi:WorkshopsService) { }

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

  deleteworkshopOnClick(id:number){
    Swal.fire({
      title: 'Are you sure want to remove this workshop?',
      text: 'You will not be able to recover this workshop!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      confirmButtonColor:'red',
    }).then(async (result) => {
      if (result.value) {
        //delete workshop confirmation
        await this.deleteFunction(id);
        Swal.fire(
          'Deleted!',
          'Your workshop has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your workshop is safe :)',
          'error'
        )
      }
    })

  }

  async deleteFunction(id){
    const reponse = await this.workshopsApi.deleteWorkshop(id).subscribe(
      res=>{
        let index= this.list.findIndex(c=>c.idWorkshop==id);
        this.list.splice(index,1);
      }, error =>{
        console.log(error);
      },()=>{
      }
    )
  }
  

}
