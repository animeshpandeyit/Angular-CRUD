import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private addEmployeeUrl = 'http://localhost:3000/employees';

  constructor(private _http: HttpClient) {}

  addEmployee(data: any): Observable<any> {
    return this._http.post(this.addEmployeeUrl, data);
  }

  getEmployees(): Observable<any> {
    return this._http.get(this.addEmployeeUrl);
  }

  deleteEmployeeData(id: any): Observable<any> {
    return this._http.delete(`${this.addEmployeeUrl}/${id}`);
  }

  updateEmployeeData(id: any, data: any): Observable<any> {
    return this._http.put(`${this.addEmployeeUrl}/${id}`, data);
  }
}
