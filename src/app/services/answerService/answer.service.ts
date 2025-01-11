import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

const BASE_URL = 'http://localhost:8080/';
@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private http: HttpClient) { }

  public getAnswerByQId(id:number):Observable<any>{
    const uri = `${(BASE_URL)}api/answers/${id}`;
    return this.http.get(uri);
  }

  submitAnswer(answer: any): Observable<any> {
    const uri = `${(BASE_URL)}api/answers`;
    return this.http.post(uri, answer);
  }
}
