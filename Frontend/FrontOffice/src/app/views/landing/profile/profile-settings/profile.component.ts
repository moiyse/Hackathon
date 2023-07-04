import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Je } from 'src/app/models/Je';
import { User } from 'src/app/models/User';
import { JeService } from 'src/app/services/je.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user!:User;
  userJe!:Je;
  settingsForm!:FormGroup
  jeObject! : Je[];
  imagePath : String = "";


  constructor(private jeService:JeService,private tokenStorage:TokenStorageService,private userService:UserService) { }

  ngOnInit(): void {
    
    this.jeService.getAllJe().subscribe(data => {this.jeObject = data;console.log(this.jeObject)},err => {console.log("error catching in je : "+err)});
    this.userService.getUserByEmail(this.tokenStorage.getUser()).subscribe(data => {
      this.user = data
      console.log("user : ",this.user)
      this.jeService.getJeByUser(this.user).subscribe(data => {this.userJe = data,console.log("je : ",data)})
      console.log("data : ",this.user)
      this.settingsForm = new FormGroup({
        first_name: new FormControl('', Validators.required),
        last_name: new FormControl('', Validators.required),
        cin: new FormControl('', [Validators.required,Validators.maxLength(8),Validators.minLength(8),Validators.pattern("^[0-9]*$")]),
        campus: new FormControl('', Validators.required),
        je: new FormControl(''),

      });
    })
      
  }

  get f() {
    return this.settingsForm.controls;
  }

  imageFileOnChange(imageInput: any){

  }

  onSubmit(){
    console.log("in submit user : ",this.settingsForm.value)
  
    if(this.settingsForm.valid){
      const userObject:User = this.user;
      userObject.prenom = this.settingsForm.value.first_name;
      userObject.nom = this.settingsForm.value.last_name
      userObject.cin = this.settingsForm.value.cin
      userObject.etablissement = this.settingsForm.value.campus
      userObject.je = this.settingsForm.value.je
      console.log("userObject : ",userObject)
      this.userService.updateUserProfile(userObject).subscribe(data => {console.log("data from update : ",data),this.tokenStorage.saveUserName(userObject.prenom)});
    }
    

  }

}
