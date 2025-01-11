import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';

const BASE_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  // Get all questions
  public getAllQuestions(page: number = 0, size: number = 10, tag?: string): Observable<any> {
    const params: any = { page, size };
    if (tag) {
      params.tag = tag; // Add 'tag' parameter only if it is provided
    }
    const uri = `${BASE_URL}api/questions`;
    return this.http.get(uri, { params });
  }

  // Get a question by its ID
  public getQuestionByID(id: number): Observable<any> {
    const uri = `${BASE_URL}api/question/${id}`;
    return this.http.get(uri);
  }

  // Get a question by its title
  public getQuestionByTitle(title: string): Observable<any> {
    const encodedTitle = encodeURIComponent(title);
    const uri = `${BASE_URL}api/question/${encodedTitle}`;
    return this.http.get(uri);
  }

  public postQuestion(question: any): Observable<any> {
    const uri = `${BASE_URL}api/questions`;
    return this.http.post(uri, question);
  }

  public SearchQuestionById(id:number):Observable<any>{
    const uri = `${BASE_URL}api/question/${id}`;
    return this.http.get(uri);
  }

  public SearchQuestionByKeyword(keyword: string): Observable<any> {
    //http://localhost:8080/api/search?keyword=proxy
    const uri = `${BASE_URL}api/search?keyword=${keyword}`;
    return this.http.get(uri);
  }
}
