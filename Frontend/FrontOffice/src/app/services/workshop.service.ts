import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Workshop } from '../models/Workshop';

@Injectable({
  providedIn: 'root'
})
export class WorkshopService {

  constructor(private http: HttpClient) { }

  getAllWorkshops(){
    return this.http.get<Workshop[]>(environment.openApiUrl+"/workshops/Get");
  }
}
