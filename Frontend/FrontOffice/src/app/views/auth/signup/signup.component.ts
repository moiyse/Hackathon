import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Je } from 'src/app/models/Je';
import { AuthService } from 'src/app/services/auth.service';
import { JeService } from 'src/app/services/je.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {

  jeMember : String = "no";
  jeList = [{name:"INCEPTUM"},{name:"ESPRO"},{name:"SUP'COM JE"}];
  imagePath : String = "";
  jeObject! : Je[];
  signUp! : FormGroup;
  errorMessage ='';
  base64Output : any;
  constructor(private jeService:JeService,private authService: AuthService,private router:Router) { }

  ngOnInit(): void {
    this.jeService.getAllJe().subscribe(data => {this.jeObject = data;console.log(this.jeObject)},err => {alert(err.message);console.log("error catching : "+err)});
    this.signUp = new FormGroup({
      nom: new FormControl('', [Validators.required]),
      prenom: new FormControl('', [Validators.required]),
      cin: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.minLength(3), Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      etablissement: new FormControl('', [Validators.required]),
      je: new FormControl('', [Validators.required]),
      imagePath: new FormControl('', [Validators.required]),
      jeMember: new FormControl(''),
      
      
    });
  }

  get f() {
    return this.signUp.controls;
  }

  onSubmit(){
    //console.log("data",this.signUp.value)
        
        //console.log("objet user",this.signUp.value)
       // const objectSignUp = {nom:this.signUp.value.nom,prenom:this.signUp.value.prenom,cin:this.signUp.value.cin,email:this.signUp.value.email,nom:this.signUp.value.nom,nom:this.signUp.value.nom,nom:this.signUp.value.nom,nom:this.signUp.value.nom,nom:this.signUp.value.nom}
        this.authService.register(this.signUp.value).subscribe(
          data => {
           // console.log(data);
            //console.log("after register data is : "+data);
            this.router.navigateByUrl("/auth")
          },
          err => {
            alert(err.message)
            this.errorMessage = err.error.message;
            
          }
        );
  }



  async processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    await reader.addEventListener( await 'load',  (event: any) => {

      this.base64Output = reader.result;
      //console.log("the new image url",this.base64Output);
      this.imagePath = this.base64Output;
      //console.log("in var image path",this.imagePath)
      //console.log("Almost out of process file")
    },false);
    if(file){
      await reader.readAsDataURL(file);
    }
    
    //console.log("is out of process file")
    
  }

  async imageFileOnChange(imageInput: any){

    await this.processFile(imageInput);
    //("is out of image file on change")
    setTimeout(() => {console.log("this is the first message")}, 10);

  }
    
  



}
