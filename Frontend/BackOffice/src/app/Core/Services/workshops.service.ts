import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Workshop } from "../Models/Workshop";

@Injectable({
  providedIn: "root",
})
export class WorkshopsService {
  constructor(private http: HttpClient) {}

  getAllWorkshops() {
    return this.http.get<Workshop[]>(environment.endpoints.Workshops.GetAll);
  }

  addWorkshop(Workshop: Workshop) {
    return this.http.post<Workshop>(
      environment.endpoints.Workshops.post,
      Workshop
    );
  }

  deleteWorkshop(id: number) {
    return this.http.delete<any>(environment.endpoints.Workshops.delete + id);
  }

  updateWorkshop(Workshop: Workshop) {
    return this.http.put<Workshop>(
      environment.endpoints.Workshops.update,
      Workshop
    );
  }

  getWorkshop(id: number) {
    return this.http.get<Workshop>(environment.endpoints.Workshops.get + id);
  }
}
