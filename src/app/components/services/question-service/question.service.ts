import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';


const BASIC_URL= ['http://localhost:8080/'];
@Injectable({
  providedIn: 'root'
})

export class QuestionService{
  constructor(private http: HttpClient){}

  getSearchedData(): Observable<any> {
    
    const dummyData = [
      {
        id: 1,
        title: 'How to implement search in Angular?',
        body: 'I am trying to implement search functionality...',
        votes: 5,
        views: 120,
        tags: ['angular', 'search'],
        postedBy: 'John Doe',
        postedDate: '2024-12-01',
      }
      ,
      {
        id: 2,
        title: 'What is dependency injection in Angular?',
        body: 'I am trying to understand dependency injection...',
        votes: 10,
        views: 300,
        tags: ['angular', 'dependency injection'],
        postedBy: 'Jane Smith',
        postedDate: '2024-11-25',
      },
    ];
    return of(dummyData); // Wrap the array in an Observable
  }
}
