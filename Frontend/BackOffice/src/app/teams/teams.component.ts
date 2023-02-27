import { Component, OnInit } from '@angular/core';
import { Team } from '../Core/Models/Team';
import { TeamsService } from '../Core/Services/teams.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  list:Team[]=[];

  constructor(private TeamsApi:TeamsService) { }

  ngOnInit(): void {
    this.TeamsApi.getAllTeams().subscribe(
      response=>{
        this.list=response;
        console.log(this.list)
      },
      error=>{
        console.log(error)
      },
      ()=>{}
    )
  }

}
