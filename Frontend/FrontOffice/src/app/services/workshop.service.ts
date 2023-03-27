import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Workshop } from '../models/Workshop';

@Injectable({
  providedIn: 'root'
})
export class WorkshopService {

  private openApiUrl = environment.openApiUrl;

  constructor(private http: HttpClient) { }

  getAllWorkshops(){
    return this.http.get<Workshop[]>(environment.openApiUrl+"/workshops/Get");
  }

  getUserWorkshops(idUser:any){
    const url= `${this.openApiUrl}/workshops/getUserWorkshops/${idUser}`;
    console.log(url);
    return this.http.get<Workshop[]>(url);
  }
}
