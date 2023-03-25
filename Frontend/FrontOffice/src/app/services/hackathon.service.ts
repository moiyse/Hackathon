import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hackathon } from '../models/Hackathon';

@Injectable({
  providedIn: 'root'
})
export class HackathonService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getCommingHackathon():Observable<Hackathon>{
    return this.http.get<Hackathon>(`${this.apiServerUrl}/hackathons/findCommingHackathon`);
  }

}
