import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Sponsor } from '../Models/Sponsor';

@Injectable({
  providedIn: 'root'
})
export class SponsorsService {

  constructor(private http: HttpClient) { }

  getAllSponsors() {
    return this.http.get<Sponsor[]>(environment.endpoints.Sponsors.GetAll);
  }

  addSponsor(Sponsor: Sponsor) {
    return this.http.post<Sponsor>(
      environment.endpoints.Sponsors.post,
      Sponsor
    );
  }

  deleteSponsor(id: number) {
    return this.http.delete<any>(environment.endpoints.Sponsors.delete + id);
  }

  updateSponsor(Sponsor: Sponsor) {
    return this.http.put<Sponsor>(
      environment.endpoints.Sponsors.update,
      Sponsor
    );
  }

  getSponsor(id: number) {
    return this.http.get<Sponsor>(environment.endpoints.Sponsors.get + id);
  }

}
