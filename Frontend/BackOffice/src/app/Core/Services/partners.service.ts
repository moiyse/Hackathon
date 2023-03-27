import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Partner } from '../Models/Partner';

@Injectable({
  providedIn: 'root'
})
export class PartnersService {

  constructor(private http: HttpClient) { }

  getAllPartners() {
    return this.http.get<Partner[]>(environment.endpoints.Partners.GetAll);
  }

  addPartner(Partner: Partner) {
    return this.http.post<Partner>(
      environment.endpoints.Partners.post,
      Partner
    );
  }

  deletePartner(id: number) {
    return this.http.delete<any>(environment.endpoints.Partners.delete + id);
  }

  updatePartner(Partner: Partner) {
    return this.http.put<Partner>(
      environment.endpoints.Partners.update,
      Partner
    );
  }

  getPartner(id: number) {
    return this.http.get<Partner>(environment.endpoints.Partners.get + id);
  }

}
