import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../models/Reservation';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  
  private openApiUrl = environment.openApiUrl;
  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  reserverWorkshop(idWorkshop:number){
    const idUser= localStorage.getItem('idUser');
    const url= `${this.openApiUrl}/Reservations/addReservation/${idWorkshop}/${idUser}`;
    console.log(url);
    return this.http.post<Reservation>(url, null);
  }

}
