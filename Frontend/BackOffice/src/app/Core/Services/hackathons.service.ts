import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Hackathon } from '../Models/Hackathon';

@Injectable({
  providedIn: 'root'
})
export class HackathonsService {

  constructor(private http: HttpClient) { }

  getAllHackathons() {
    return this.http.get<Hackathon[]>(environment.endpoints.Hackathons.GetAll);
  }

  addHackathon(Hackathon: Hackathon) {
    return this.http.post<Hackathon>(
      environment.endpoints.Hackathons.post,
      Hackathon
    );
  }

  deleteHackathon(id: number) {
    return this.http.delete<any>(environment.endpoints.Hackathons.delete + id);
  }

  updateHackathon(Hackathon: Hackathon) {
    return this.http.put<Hackathon>(
      environment.endpoints.Hackathons.update,
      Hackathon
    );
  }

  getHackathon(id: number) {
    return this.http.get<Hackathon>(environment.endpoints.Hackathons.get + id);
  }

}
