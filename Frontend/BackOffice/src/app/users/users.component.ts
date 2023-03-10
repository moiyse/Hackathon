import { Component, OnInit } from '@angular/core';
import { User } from '../Core/Models/User';
import { UsersService } from '../Core/Services/users.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  list:User[]=[];

  constructor(private UsersApi:UsersService) { }

  ngOnInit(): void {
    this.UsersApi.getUsers().subscribe(
      response=>{
        this.list=response;
      },
      error=>{
        console.log(error)
      },
      ()=>{}
    )
  }

  
  deleteUserOnClick(id:number){
    Swal.fire({
      title: 'Are you sure want to remove this User?',
      text: 'You will not be able to recover this User!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      confirmButtonColor:'red',
    }).then(async (result) => {
      if (result.value) {
        //delete User confirmation
        await this.deleteFunction(id);
        Swal.fire(
          'Deleted!',
          'Your User has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your User is safe :)',
          'error'
        )
      }
    })

  }

  async deleteFunction(id){
    const reponse = await this.UsersApi.deleteAdmin(id).subscribe(
      res=>{
        let index= this.list.findIndex(c=>c.idUser==id);
        this.list.splice(index,1);
      }, error =>{
        console.log(error);
      },()=>{
      }
    )
  }
  

}
