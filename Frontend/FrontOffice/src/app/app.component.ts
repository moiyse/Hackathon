import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private authService:AuthService){
    
  }
  ngOnInit(): void {
    //console.log("in app on init")
    this.authService.chechAuth();
  }

  title = 'HackathonFront';
}
