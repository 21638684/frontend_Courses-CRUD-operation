import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course } from '../shared/course';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl = 'https://localhost:7049/api/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  GetCourses(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}Course/GetAllCourses`)
      .pipe(map(result => result));
  }

  DeleteCourse(courseId: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}Course/DeleteCourse/${courseId}`);
  }

  EditCourse(courseId: number, updatedCourse: any): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}Course/EditCourse/${courseId}`, updatedCourse, this.httpOptions);
  }

  AddCourse(course: Course): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}Course/AddCourse`, course, this.httpOptions);
  }

}



