import { Routes } from '@angular/router';
import { PostQuestionComponent } from './post-question/post-question.component';
import { LatestQuestionsComponent } from './latest-questions/latest-questions.component';
import { AboutComponent } from './about/about.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { LoginComponent } from './login/login.component';
import { AnswerPageComponent } from './answer-page/answer-page.component'; // Import the AnswerPageComponent

export const routes: Routes = [
  { path: '', redirectTo: '/latest-questions', pathMatch: 'full' },
  { path: 'post-question', component: PostQuestionComponent },
  { path: 'latest-questions', component: LatestQuestionsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'my-profile', component: MyProfileComponent },
  { path: 'question/:id', component: AnswerPageComponent }, // Ensure this route is present
  { path: '**', redirectTo: '/latest-questions' }
];
