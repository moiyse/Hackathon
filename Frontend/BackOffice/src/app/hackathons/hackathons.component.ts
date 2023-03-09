import { Component, OnInit } from '@angular/core';
import { Hackathon } from '../Core/Models/Hackathon';
import { HackathonsService } from '../Core/Services/hackathons.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-hackathons',
  templateUrl: './hackathons.component.html',
  styleUrls: ['./hackathons.component.scss']
})
export class HackathonsComponent implements OnInit {
  list:Hackathon[]=[];

  constructor(private HackathonsApi:HackathonsService) { }

  ngOnInit(): void {
    this.HackathonsApi.getAllHackathons().subscribe(
      response=>{
        this.list=response;
      },
      error=>{
        console.log(error)
      },
      ()=>{}
    )
      
  }

  deletehackathonOnClick(id:number){
    Swal.fire({
      title: 'Are you sure want to remove this hackathon?',
      text: 'You will not be able to recover this hackathon!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      confirmButtonColor:'red',
    }).then(async (result) => {
      if (result.value) {
        //delete hackathon confirmation
        await this.deleteFunction(id);
        Swal.fire(
          'Deleted!',
          'Your hackathon has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your hackathon is safe :)',
          'error'
        )
      }
    })

  }

  async deleteFunction(id){
    const reponse = await this.HackathonsApi.deleteHackathon(id).subscribe(
      res=>{
        let index= this.list.findIndex(h=>h.idHackathon==id);
        this.list.splice(index,1);
      }, error =>{
        console.log(error);
      },()=>{
      }
    )
  }

}
