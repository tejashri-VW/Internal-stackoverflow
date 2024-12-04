import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';

import { PostQuestionComponent } from './post-question/post-question.component';
import { LatestQuestionsComponent } from './latest-questions/latest-questions.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AnswerPageComponent } from './answer-page/answer-page.component'; // Import the AnswerPageComponent

const routes: Routes = [
  { path: '', redirectTo: '/latest-questions', pathMatch: 'full' },
  { path: 'post-question', component: PostQuestionComponent },
  { path: 'latest-questions', component: LatestQuestionsComponent },
  { path: 'my-profile', component: MyProfileComponent },
  { path: 'question/:id', component: AnswerPageComponent }, // Ensure this route is present
  { path: '**', redirectTo: '/latest-questions' }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration()
  ]
};
