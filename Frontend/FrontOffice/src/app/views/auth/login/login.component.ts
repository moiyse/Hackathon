import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  logIn!: FormGroup;


  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router:Router) { }

  ngOnInit(): void {

    this.logIn = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(3), Validators.email]),
      password: new FormControl('', Validators.required),
      
    });
  }

  get f() {
    return this.logIn.controls;
  }


  onSubmit(){
    //console.log(typeof(this.logIn.value));
    this.authService.login(this.logIn.value).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data.email);
        //console.log(this.tokenStorage.getToken());
        this.router.navigateByUrl('/landing');
      },
      err => {
        alert(err.message);
      }
    );
    // console.log(this.logIn.value);
  }



}
