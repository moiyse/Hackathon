import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Reclamation } from '../models/Reclamation';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
    

    private openApiUrl = environment.openApiUrl;
    private apiBaseUrl = environment.apiBaseUrl;

    constructor(private http:HttpClient) { }

    public addReclamation(reclamation:Reclamation){
        return this.http.post(`${this.openApiUrl}/reclamation/Post`,reclamation);
    }

}