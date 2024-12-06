import { Component, OnInit } from '@angular/core';
import {CommonModule, formatDate} from '@angular/common';
import {format} from 'node:url';
import {RouterLink} from '@angular/router'; // Import CommonModule

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
  standalone: true,
  imports: [CommonModule] // Add CommonModule here for ngFor
})
export class MyProfileComponent implements OnInit {

  totalQuestions: number = 25; // Example data
  answersGiven: number = 18; // Example data
  avgResponseTime: number = 2.5; // Example data in hours

  // Example recent activities
  recentActivities = [
    { title: "Answered a question", description: "I provided an answer to a question about Angular.", emoji: "✔️", date: "2024-11-25" },
    { title: "Asked a question", description: "I asked a question about Angular services.", emoji: "❓", date: "2024-11-22" },
    { title: "Voted on a question", description: "I voted on a question regarding best practices in API design.", emoji: "👍", date: "2024-11-21" }
  ];

  constructor() { }

  ngOnInit(): void {
    // Fetch data or API call logic goes here
  }

  activities: any = [
    {
      id: 1,
      type: 'question',
      title: 'New question posted by',
      date: new Date('2024-11-15T13:30:00'),
      user: 'You',
      questionId: 123
    },
    {
      id: 2,
      type: 'answer',
      title: 'Answer provided by',
      date: new Date('2024-11-15T13:15:00'),
      user: 'Jane Smith',
      questionId: 124
    },
    {
      id: 3,
      type: 'accepted',
      title: 'Answer accepted by',
      date: new Date('2024-11-15T13:00:00'),
      user: 'Mike Johnson',
      questionId: 125
    }
  ];

  // formatDate(date: Date): string {
  //   return format(date, 'MM/dd/yy, h:mm a');
  // }

  getIconColor(type: string): string {
    switch (type) {
      case 'question':
        return '#4285F4';  // Blue
      case 'answer':
        return '#34A853';  // Green
      case 'accepted':
        return '#FBBC05';  // Gold
      default:
        return '#EA4335';  // Red
    }
  }

  protected readonly formatDate = formatDate;
}
