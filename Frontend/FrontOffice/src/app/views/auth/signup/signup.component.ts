import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Je } from 'src/app/models/Je';
import { AuthService } from 'src/app/services/auth.service';
import { JeService } from 'src/app/services/je.service';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmailVerificationModalComponent } from './modals/email-verification-modal/email-verification-modal.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  jeMember : String = "no";
  imagePath : String = "";
  jeObject! : Je[];
  signUp! : FormGroup;
  errorMessage ='';
  base64Output : any;
  messageTitleToDisplay ="Verify your email";
  messageToDisplay = "A verification link will be sent to your email address";

  constructor(private dialog: MatDialog,private jeService:JeService,private authService: AuthService,private router:Router) { }

  ngOnInit(): void {
    this.jeService.getAllJe().subscribe(data => {this.jeObject = data;console.log(this.jeObject)},err => {console.log("error catching in je : "+err)});
    this.signUp = new FormGroup({
      nom: new FormControl('', [Validators.required]),
      prenom: new FormControl('', [Validators.required]),
      cin: new FormControl('', [Validators.required,Validators.maxLength(8),Validators.minLength(8),Validators.pattern("^[0-9]*$")]),
      email: new FormControl('', [Validators.required, Validators.minLength(3), Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      etablissement: new FormControl('', [Validators.required]),
      je: new FormControl(''),
      imagePath: new FormControl(''/*, [Validators.required]*/),
      jeMember: new FormControl(''),
      
      
    });
  }

  get fs() {
    return this.signUp.controls;
  }

  onSubmit(){
    console.log("data",this.signUp.value)
        
        //console.log("objet user",this.signUp.value)
       // const objectSignUp = {nom:this.signUp.value.nom,prenom:this.signUp.value.prenom,cin:this.signUp.value.cin,email:this.signUp.value.email,nom:this.signUp.value.nom,nom:this.signUp.value.nom,nom:this.signUp.value.nom,nom:this.signUp.value.nom,nom:this.signUp.value.nom}
      if(this.signUp.valid){
        this.authService.register(this.signUp.value).subscribe(
          data => {
            console.log("result that came from signup : ",data);
            //console.log("after register data is : "+data);
            
          },
          err => {
            if(err.status == 440)
            {
              this.messageTitleToDisplay = "Email in use"
              this.messageToDisplay = "The email you entered is already in use"
            }
            else{
              this.messageTitleToDisplay = "Something went wrong"
              this.messageToDisplay = "Your account was not registered successfully"
            }
            console.log("status of errror",err.status)
          },
        );
        setTimeout(() =>{
          const dialogRef = this.dialog.open(EmailVerificationModalComponent, {
            width: '500px',
            data: {messageTitle: this.messageTitleToDisplay,message:this.messageToDisplay}
          });
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
          });
        },1000)
      } 
       
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
    setTimeout(() =>console.log(""), 10);

  }
    
  



}
