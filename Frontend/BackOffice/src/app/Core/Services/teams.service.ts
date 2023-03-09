import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Team } from '../Models/Team';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(private http: HttpClient) { }

  getAllTeams() {
    return this.http.get<Team[]>(environment.endpoints.teams.GetAll);
  }

  getTeam(id: number) {
    return this.http.get<Team>(environment.endpoints.teams.get + id);
  }
}
