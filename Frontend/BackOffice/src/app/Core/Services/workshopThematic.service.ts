import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { WorkshopThematic } from '../Models/WorkshopThematic';

@Injectable({
  providedIn: 'root'
})
export class WorkshopThematicsService {

  constructor(private http: HttpClient) { }

  getAllWorkshopThematics() {
    return this.http.get<WorkshopThematic[]>(environment.endpoints.WorkshopThematics.GetAll);
  }

  addWorkshopThematic(WorkshopThematic: WorkshopThematic) {
    return this.http.post<WorkshopThematic>(
      environment.endpoints.WorkshopThematics.post,
      WorkshopThematic
    );
  }

  deleteWorkshopThematic(id: number) {
    return this.http.delete<any>(environment.endpoints.WorkshopThematics.delete + id);
  }

  updateWorkshopThematic(WorkshopThematic: WorkshopThematic) {
    return this.http.put<WorkshopThematic>(
      environment.endpoints.WorkshopThematics.update,
      WorkshopThematic
    );
  }

  getWorkshopThematic(id: number) {
    return this.http.get<WorkshopThematic>(environment.endpoints.WorkshopThematics.get + id);
  }

}
