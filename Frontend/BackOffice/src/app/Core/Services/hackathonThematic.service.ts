import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HackathonThematic } from '../Models/HackathonThematic';

@Injectable({
  providedIn: 'root'
})
export class HackathonThematicsService {

  constructor(private http: HttpClient) { }

  getAllHackathonThematics() {
    return this.http.get<HackathonThematic[]>(environment.endpoints.HackathonThematics.GetAll);
  }

  addHackathonThematic(HackathonThematic: HackathonThematic) {
    return this.http.post<HackathonThematic>(
      environment.endpoints.HackathonThematics.post,
      HackathonThematic
    );
  }

  deleteHackathonThematic(id: number) {
    return this.http.delete<any>(environment.endpoints.HackathonThematics.delete + id);
  }

  updateHackathonThematic(HackathonThematic: HackathonThematic) {
    return this.http.put<HackathonThematic>(
      environment.endpoints.HackathonThematics.update,
      HackathonThematic
    );
  }

  getHackathonThematic(id: number) {
    return this.http.get<HackathonThematic>(environment.endpoints.HackathonThematics.get + id);
  }

}
