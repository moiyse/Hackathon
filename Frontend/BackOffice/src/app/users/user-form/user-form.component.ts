import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../Core/Models/User';
import { UsersService } from '../../Core/Services/users.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  id:number;
  User: User;
  userForm:FormGroup;
  action:string;

  constructor(private UsersApi:UsersService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    //initialise User Form
    this.userForm=new FormGroup({
      idUser: new FormControl(''),
      nom: new FormControl('',Validators.required),
      prenom: new FormControl('',Validators.required),
      email:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required),
      cin: new FormControl('',Validators.required),
      num_phone:new FormControl('',Validators.required),
      etablissement:new FormControl('',Validators.required),
      role:new FormControl('ADMIN',Validators.required),
    })

    
    this.route.params.subscribe(
      (params)=>{
        this.id=params['id'];
        if(this.id!=null){
          this.action="update";
          this.UsersApi.getUser(this.id).subscribe(res=>{
            this.User=res;

            //setting form data from User object
            this.userForm.controls.idUser.setValue(this.id);
            this.userForm.get("nom").setValue(this.User.nom);
            this.userForm.get("prenom").setValue(this.User.prenom);
            this.userForm.get("cin").setValue(this.User.cin);
            this.userForm.get("num_phone").setValue(this.User.num_phone);
            this.userForm.get("email").setValue(this.User.email);
            this.userForm.get("password").setValue(this.User.password);
            this.userForm.get("etablissement").setValue(this.User.etablissement);
            
          },
          ()=>{console.log('error')},
          ()=>{}
          )
        }else{
          this.action="new";
          this.User=new User();
        }
      },
      ()=>{console.log('error')},
      ()=>{}
    )
  }

  onSubmit(){
    if(this.action=='new'){
        this.UsersApi.addAdmin(this.userForm.value).subscribe(res=>{
        },
        error=>{console.log(error)},
        async ()=>{
          await this.alertAddWithSuccess();
          this.router.navigate(["users"]);
        }
        )
  }else if (this.action=='update') {
    this.UsersApi.updateAdmin(this.userForm.value).subscribe(res=>{
    },
    error=>{console.log(error)},
    async ()=>{
      await this.alerUpdatetWithSuccess();
      this.router.navigate(["users"]);
    }
    )
  } 
}

  async alertAddWithSuccess(){
    const msg=await Swal.fire('DONE', 'Your User added successfully!', 'success');
  }

  async alerUpdatetWithSuccess(){
    const msg=await Swal.fire('DONE', 'Your User updated successfully!', 'success');
  }


}
