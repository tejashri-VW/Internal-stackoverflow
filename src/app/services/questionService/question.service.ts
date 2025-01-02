import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  // Get all questions
  public getAllQuestions(): Observable<any> {
    const uri = BASE_URL + 'api/all-question';
    return this.http.get(uri);
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

  public PostQuestion(question: any): Observable<any> {
    const uri = `${BASE_URL}api/question`;
    return this.http.post(uri, question);
  }
  
  public SearchQuestionById(id:number):Observable<any>{
    const uri = `${BASE_URL}api/question/${id}`;
    return this.http.get(uri);
  }

  public SearchQuestionByFilter(filter: string): Observable<any> {
    const encodedTitle = encodeURIComponent(filter); 
    const uri = `${BASE_URL}api/question/${encodedTitle}`;
    return this.http.get(uri);
  }
}
