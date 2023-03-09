import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {

  jeMember : String = "no";
  jeList = [{name:"INCEPTUM"},{name:"ESPRO"},{name:"SUP'COM JE"}];
  imageStr : String = "";
  constructor() { }

  ngOnInit(): void {
  }

}
