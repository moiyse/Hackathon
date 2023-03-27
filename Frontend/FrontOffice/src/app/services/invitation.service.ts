import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Invitation } from '../models/Invitation';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getInvitationSent(user:any):Observable<any[]>{
    return this.http.post<any[]>(`${this.apiServerUrl}/invitation/getInvitationsSentByUser`,user);
  }

  public getInvitationReceived(user:any):Observable<any[]>{
    return this.http.post<any[]>(`${this.apiServerUrl}/invitation/getInvitationsReceivedByUser`,user);
  }

  public refuserInvitation(idInvitation:number){
    return this.http.delete(`${this.apiServerUrl}/invitation/deleteInvitationOnRefuse/`+idInvitation);
  }

  public sendInvitation(sender:User,emailReceiver:String):Observable<Boolean>{
    return this.http.post<Boolean>(`${this.apiServerUrl}/invitation/sendInvitationByEmail/`+emailReceiver,sender);
  }

  public changeInvitationStatus(user:User,idInvitation:number,statusString:String):Observable<Invitation>{
    return this.http.put<Invitation>(`${this.apiServerUrl}/invitation/changeStatusOfInvitation/`+idInvitation+"/"+statusString,user);
  }

}
