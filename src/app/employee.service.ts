import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  // private url = 'http://localhost:3000/';
  private url = 'https://emp-backend-vt24.onrender.com/';
  constructor(private http: HttpClient) {}

  private _autoRefresh = new Subject<void>();

  get autoRefresh() {
    return this._autoRefresh;
  }

  addEmployee(data: any): Observable<any> {
    return this.http
      .post(this.url + 'employee', data)
      .pipe(tap(() => this._autoRefresh.next()));
  }

  getAllEmployee(): Observable<any> {
    return this.http.get(this.url + 'employee');
  }

  getSigleEmployee(id: number): Observable<any> {
    return this.http.get(this.url + 'employee/' + id);
  }

  updateSingleEmploye(id: number, data: any): Observable<any> {
    return this.http.put(this.url + 'employee/' + id, data).pipe(
      tap(() => {
        this._autoRefresh.next();
      })
    );
  }

  deleteEmployee(empID: number): Observable<any> {
    return this.http
      .delete(this.url + 'employee/' + empID)
      .pipe(tap(() => this._autoRefresh.next()));
  }
}
